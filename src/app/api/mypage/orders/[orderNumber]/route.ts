// app/api/mypage/orders/[orderNumber]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// 주문배송 - 리뷰쓰기에서 리뷰작성한 상품인지 조회
interface Params {
  params: { orderNumber: string };
}

export async function GET(req: Request, { params }: Params) {
  const { orderNumber } = params;

  // order + items + user 배송 정보
  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      user: true, // ✅ 그대로
      items: {
        include: {
          reviews: true, // ✅ 리뷰 여부 판단용만 추가
        },
      },
    },
  });

  if (!order) {
    return NextResponse.json(
      { message: "주문을 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  // 필요한 필드만 가공
  const formatted = {
    // ===== 기존 =====
    id: order.id,
    orderNumber: order.orderNumber,
    date: order.createdAt.toISOString().slice(0, 10),
    status: order.status,

    user: {
      name: order.user.name,
      phone: order.user.phone,
      address: order.user.address,
    },

    // ===== items 유지 + 확장 =====
    items: order.items.map((item) => ({
      id: item.id,
      productName: item.productName,
      quantity: item.quantity,
      totalPrice: item.totalPrice,

      // 🔥 추가 필드 (리뷰 선택 페이지용)
      img: item.img ?? "/sample.png",
      reviewWritten: item.reviews.length > 0,
    })),
  };

  return NextResponse.json(formatted);
}
