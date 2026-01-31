// app/api/mypage/orders/[orderNumber]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { orderNumber: string };
}

export async function GET(req: Request, { params }: Params) {
  const { orderNumber } = params;

  // order + items + user 배송 정보
  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: true,
      user: true, // 배송정보 가져오기 위해
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
    id: order.id,
    orderNumber: order.orderNumber,
    date: order.date.toISOString().slice(0, 10),
    status: order.status,
    shipping: {
      name: order.user.name,
      phone: order.user.phone,
      address: order.user.address,
    },
    items: order.items.map((item) => ({
      id: item.id,
      productName: item.productName,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
    })),
  };

  return NextResponse.json(formatted);
}
