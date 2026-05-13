import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { calcDiscountPrice } from "@/utils/calcDiscoutPrice";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.username) {
      return NextResponse.json([], { status: 200 });
    }

    const targetUsername = session.user.username;

    const user = await prisma.user.findUnique({
      where: { username: targetUsername },
      select: {
        id: true,
        username: true,
      },
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

            discountType: true,
            discountValue: true,
          },
        },
        option: {
          select: {
            id: true,
            optionName: true,
            optionName2: true,
            optionValue: true,
            optionValue2: true,
            price: true,
            stock: true,

            discountType: true,
            discountValue: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedItems = cartItems.map((item: any) => {
      const optionText = item.option
        ? [
            item.option.optionName,
            item.option.optionValue,
            item.option.optionName2,
            item.option.optionValue2,
          ]
            .filter(Boolean)
            .join(" ")
        : "옵션 없음";

      const originPrice = item.option?.price || 0;

      let finalPrice = originPrice;

      // 옵션 할인 우선
      if (item.option?.discountType && item.option?.discountValue) {
        finalPrice = calcDiscountPrice({
          price: originPrice,
          discountType: item.option.discountType,
          discountValue: item.option.discountValue,
        });
      }

      // 상품 할인
      else if (item.product?.discountType && item.product?.discountValue) {
        finalPrice = calcDiscountPrice({
          price: originPrice,
          discountType: item.product.discountType,
          discountValue: item.product.discountValue,
        });
      }

      return {
        cartItemId: item.id,
        productId: item.productId,
        productName: item?.product?.name,
        thumbnail: item?.product?.thumbnail,
        isCustomizable: item?.product?.isCustomizable || false,
        optionId: item.productOptionId,

        optionName: optionText,

        originPrice,
        finalPrice,

        quantity: item.quantity,
      };
    });

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
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    const body = await req.json();

    const items: {
      productId: number;
      productOptionId: number;
      quantity: number;
    }[] = body.items;

    for (const item of items) {
      const option = await prisma.productOption.findUnique({
        where: {
          id: item.productOptionId,
        },
      });

      if (!option) {
        return NextResponse.json(
          { message: "존재하지 않는 옵션입니다." },
          { status: 404 },
        );
      }

      if (option.status !== "ONSALE") {
        return NextResponse.json(
          { message: "판매 불가능한 상품입니다." },
          { status: 400 },
        );
      }

      const exist = await prisma.cartItem.findUnique({
        where: {
          userId_productOptionId: {
            userId: Number(session.user.id),
            productOptionId: item.productOptionId,
          },
        },
      });

      // 수량 증가
      if (exist) {
        await prisma.cartItem.update({
          where: {
            id: exist.id,
          },
          data: {
            quantity: exist.quantity + item.quantity,
          },
        });
      } else {
        // 새로 생성
        await prisma.cartItem.create({
          data: {
            userId: Number(session.user.id),
            productId: item.productId,
            productOptionId: item.productOptionId,
            quantity: item.quantity,
          },
        });
      }
    }

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "장바구니 추가 실패" },
      { status: 500 },
    );
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
