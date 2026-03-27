// app/api/payment/toss/confirm/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { paymentKey, orderId, amount } = await request.json();

  const secretKey = process.env.TOSS_SECRET_KEY;
  const encryptedKey = Buffer.from(`${secretKey}:`).toString("base64");

  try {
    // 1. 토스 승인 API 호출
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
      return NextResponse.json(result, { status: response.status });
    }

    await prisma.order.update({
      where: {
        orderNumber: orderId,
      },
      data: {
        status: "PAYMENT_COMPLETE",
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("승인 API 에러:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
