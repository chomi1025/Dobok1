import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const STATUS_MAP: Record<string, string> = {
  PENDING: "결제대기",
  PAYMENT_COMPLETE: "결제완료",
  PREPARING: "상품준비중",
  SHIPPING: "배송중",
  DELIVERED: "배송완료",
  CANCELLED: "취소됨",
};

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { content, adminName } = await request.json();

    const newHistory = await prisma.orderHistory.create({
      data: {
        orderId: String(id),
        content: content,
        adminName: adminName || "관리자",
      },
    });

    return NextResponse.json(newHistory);
  } catch (error) {
    console.error("History Create Error:", error);
    return NextResponse.json({ error: "히스토리 생성 실패" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, carrier, trackingNumber } = body;

    const oldOrder = await prisma.order.findUnique({
      where: { orderNumber: id },
    });

    if (!oldOrder) {
      return NextResponse.json(
        { error: "주문을 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { orderNumber: id },
      data: {
        status: status,
        carrier: carrier || null,
        trackingNumber: trackingNumber || null,
      },
    });

    const historyEntries = [];

    if (oldOrder.status !== status) {
      const koreanStatus = STATUS_MAP[status] || status;
      historyEntries.push({
        orderId: id,
        content: `상태 변경: ${koreanStatus}`,
        adminName: "관리자",
      });
    }

    if (trackingNumber && oldOrder.trackingNumber !== trackingNumber) {
      const isUpdate = !!oldOrder.trackingNumber;
      historyEntries.push({
        orderId: id,
        content: isUpdate
          ? `송장 수정: ${trackingNumber} (${carrier})`
          : `송장 등록: ${trackingNumber} (${carrier})`,
        adminName: "관리자",
      });
    }

    if (historyEntries.length > 0) {
      await prisma.orderHistory.createMany({
        data: historyEntries,
      });
    }

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Order Update Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const histories = await prisma.orderHistory.findMany({
    where: { orderId: id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(histories);
}
