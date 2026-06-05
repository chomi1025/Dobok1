import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        message: "로그인이 필요합니다.",
      },
      {
        status: 401,
      },
    );
  }

  const currentUserId = Number(session.user.id);

  try {
    const order = await prisma.order.findUnique({
      where: {
        orderNumber: params.id,
      },
    });

    if (!order) {
      return NextResponse.json(
        { message: "주문을 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    if (order.userId !== currentUserId) {
      return NextResponse.json(
        {
          message: "본인 주문만 취소할 수 있습니다.",
        },
        {
          status: 403,
        },
      );
    }

    if (order.status !== "PAYMENT_COMPLETE") {
      return NextResponse.json(
        {
          message: "결제완료 상태의 주문만 취소할 수 있습니다.",
        },
        { status: 400 },
      );
    }

    const claimNumber = params.id.replace("HS-", "YO-C-");

    await prisma.$transaction([
      prisma.order.update({
        where: {
          orderNumber: params.id,
        },
        data: {
          status: "CANCELLED",
          cancelledAt: new Date(),
        },
      }),

      prisma.claim.create({
        data: {
          claimNumber,
          claimType: "CANCEL",
          status: "COMPLETED",
          orderId: params.id,
          userId: currentUserId,
          detail: "고객 직접 주문취소",

          requestedAt: new Date(),
          processedAt: new Date(),

          orderItemId: null,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "주문 취소 중 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
