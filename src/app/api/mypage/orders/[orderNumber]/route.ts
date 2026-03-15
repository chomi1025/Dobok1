import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

interface Params {
  params: { orderNumber: string };
}

type OrderItemWithDetails = Prisma.OrderItemGetPayload<{
  include: {
    reviews: true;
    product: true;
  };
}>;

export async function GET(req: Request, { params }: Params) {
  const { orderNumber } = params;

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      user: true,
      items: {
        include: {
          reviews: true,
          product: true,
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

  const formatted = {
    id: order.id,
    orderNumber: order.orderNumber,
    date: order.createdAt.toISOString().slice(0, 10),
    status: order.status,

    user: {
      name: order.user.name,
      phone: order.user.phone,
      address: order.user.address,
    },

    items: order.items.map((item: OrderItemWithDetails) => ({
      id: item.id,
      productName: item.productName,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      img: item.product.thumbnail ?? "/sample.png",
      reviewWritten: item.reviews.length > 0,
    })),
  };

  return NextResponse.json(formatted);
}
