import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface CartReqItem {
  productId: number | string;
  productOptionId: number | string;
  quantity: number | string;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json([], { status: 200 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "유저를 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            thumbnail: true,
            isCustomizable: true,
          },
        },
        option: {
          select: {
            id: true,
            color: true,
            size: true,
            price: true,
            stock: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedItems = cartItems.map((item: any) => ({
      cartItemId: item.id,
      productId: item.productId,
      productName: item?.product?.name || "상품명 없음",
      thumbnail: item?.product?.thumbnail,
      isCustomizable: item?.product?.isCustomizable || false,
      optionId: item.productOptionId,

      optionName: item.option
        ? `${item.option.color || ""} ${item.option.size || ""}`.trim()
        : "옵션 없음",
      price: item.option?.price || 0,
      quantity: item.quantity,
    }));

    return NextResponse.json(formattedItems, { status: 200 });
  } catch (error) {
    console.error("장바구니 조회 에러:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "로그인이 필요합니다." },
      { status: 401 },
    );

  const userId = Number(session.user.id);
  const { items } = await req.json();

  try {
    for (const item of items) {
      const pId = Number(item.productId);
      const oId = Number(item.productOptionId);
      const qty = Number(item.quantity);

      if (!oId) throw new Error("유효하지 않은 옵션 ID입니다.");

      await prisma.cartItem.upsert({
        where: {
          userId_productOptionId: {
            userId: userId,
            productOptionId: oId,
          },
        },
        create: {
          userId: userId,
          productId: pId,
          productOptionId: oId,
          quantity: qty,
        },
        update: {
          quantity: { increment: qty },
        },
      });
    }
    return NextResponse.json({ message: "장바구니 담기 성공!" });
  } catch (error) {
    return NextResponse.json({ message: "서버 에러 발생" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "로그인이 필요합니다." },
      { status: 401 },
    );
  }

  const userId = Number(session.user.id);

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const idsString = searchParams.get("ids");

  try {
    // 전체 삭제
    if (type === "all") {
      await prisma.cartItem.deleteMany({
        where: { userId: userId },
      });
      return NextResponse.json({ message: "전체 삭제 성공" });
    }

    // 선택/개별 삭제
    if (idsString) {
      const ids = idsString.split(",").map((id) => Number(id));
      console.log("숫자로 변환된 IDs 배열:", ids);
      const result = await prisma.cartItem.deleteMany({
        where: {
          id: { in: ids },
          userId: userId,
        },
      });

      if (result.count === 0) {
        return NextResponse.json(
          { error: "삭제할 대상을 찾지 못함" },
          { status: 404 },
        );
      }

      return NextResponse.json({ message: "선택 삭제 성공" });
    }

    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}
