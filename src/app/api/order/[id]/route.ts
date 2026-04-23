import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, carrier, trackingNumber } = body;

    const order = await prisma.order.findUnique({
      where: { orderNumber: id },
    });

    if (!order) {
      return NextResponse.json(
        { error: "주문을 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { orderNumber: id },
      data: {
        status: status as OrderStatus,
        trackingNumber: trackingNumber || null,
        carrier: carrier || null,
      },
    });

    await prisma.orderHistory.create({
      data: {
        orderId: id,
        content: `상태 변경: ${status}`,
        adminName: "관리자",
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Order Update Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
