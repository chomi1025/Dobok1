import { NextResponse } from "next/server";
import { PrismaClient, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { imp_uid, merchant_uid } = await req.json();
    console.log("🔑 사용하는 API 키:", process.env.PORTONE_API_KEY);
    console.log(
      "🔑 사용하는 Secret:",
      process.env.PORTONE_API_SECRET?.substring(0, 5) + "****",
    );
    // 1. 포트원 토큰 발급 (결제 정보를 가져오기 위해 필요해)
    const tokenRes = await fetch("https://api.iamport.kr/users/getToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imp_key: process.env.PORTONE_API_KEY, // .env에 설정해둔 키
        imp_secret: process.env.PORTONE_API_SECRET, // .env에 설정해둔 시크릿
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) throw new Error("포트원 토큰 발급 실패");
    const { access_token } = tokenData.response;

    // 2. 포트원 서버에서 실제 결제 정보 가져오기
    const paymentRes = await fetch(
      `https://api.iamport.kr/payments/${imp_uid}`,
      {
        headers: { Authorization: access_token },
      },
    );
    const paymentData = await paymentRes.json();
    const { amount, status } = paymentData.response;

    // 3. 우리 DB에서 해당 주문 정보 가져오기
    const order = await prisma.order.findUnique({
      where: { orderNumber: merchant_uid },
    });

    if (!order) {
      return NextResponse.json(
        { message: "주문 정보를 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    // 4. 결제 금액 비교 (매우 중요!)
    if (amount === order.total) {
      await prisma.order.update({
        where: { orderNumber: merchant_uid },
        data: {
          status: OrderStatus.PAYMENT_COMPLETE, // '"PAID"' 대신 OrderStatus.PAID 사용!
        },
      });

      return NextResponse.json({ message: "결제 검증 성공" });
    } else {
      // 금액 불일치 (위조 가능성)
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
