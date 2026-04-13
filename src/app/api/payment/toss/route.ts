import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { paymentKey, orderId, amount } = await request.json();

  try {
    // DB 주문조회
    const order = await prisma.order.findUnique({
      where: { orderNumber: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { message: "주문을 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    // 무한요청 방지
    if (order.status === "PAYMENT_COMPLETE") {
      return NextResponse.json({
        message: "Already Processed",
        userName: order.buyerName,
      });
    }

    // 토스 승인 요청
    const secretKey = process.env.TOSS_SECRET_KEY;
    const encryptedKey = Buffer.from(`${secretKey}:`).toString("base64");

    const response = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${encryptedKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount,
        }),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      if (result.code === "ALREADY_PROCESSED_PAYMENT") {
        return NextResponse.json({
          message: "Success",
          userName: order.buyerName,
        });
      }
      return NextResponse.json(result, { status: response.status });
    }

    // DB 업데이트
    const updatedOrder = await prisma.order.update({
      where: {
        orderNumber: orderId,
      },
      data: {
        status: "PAYMENT_COMPLETE",
      },
    });

    return NextResponse.json({
      message: "Success",
      userName: updatedOrder.buyerName,
    });
  } catch (error) {
    console.error("승인 API 에러:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
