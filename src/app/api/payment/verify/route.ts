import { NextResponse } from "next/server";
import { PrismaClient, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { imp_uid, merchant_uid } = await req.json();

    const tokenRes = await fetch("https://api.iamport.kr/users/getToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imp_key: process.env.PORTONE_API_KEY,
        imp_secret: process.env.PORTONE_API_SECRET,
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) throw new Error("포트원 토큰 발급 실패");
    const { access_token } = tokenData.response;

    const paymentRes = await fetch(
      `https://api.iamport.kr/payments/${imp_uid}`,
      {
        headers: { Authorization: access_token },
      },
    );
    const paymentData = await paymentRes.json();
    const { amount, status } = paymentData.response;

    const order = await prisma.order.findUnique({
      where: { orderNumber: merchant_uid },
    });

    if (!order) {
      return NextResponse.json(
        { message: "주문 정보를 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    if (amount === order.total) {
      await prisma.order.update({
        where: { orderNumber: merchant_uid },
        data: {
          status: OrderStatus.PAYMENT_COMPLETE,
        },
      });

      return NextResponse.json({ message: "결제 검증 성공" });
    } else {
      return NextResponse.json(
        { message: "결제 금액 불일치" },
        { status: 400 },
      );
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
