import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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
      await prisma.cartItem.upsert({
        where: {
          userId_productOptionId: {
            userId: userId,
            productOptionId: Number(item.productOptionId),
          },
        },
        create: {
          userId: userId,
          productId: Number(item.productId),
          productOptionId: Number(item.productOptionId),
          quantity: Number(item.quantity),
        },
        update: {
          quantity: { increment: Number(item.quantity) },
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
