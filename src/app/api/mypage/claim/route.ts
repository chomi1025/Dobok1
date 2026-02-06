// app/api/mypage/claims/route.ts
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "로그인이 필요합니다." },
      { status: 401 },
    );
  }

  // 유저 기준 claim 조회
  const claims = await prisma.claim.findMany({
    where: {
      orderItem: {
        order: {
          userId: Number(session.user.id),
        },
      },
    },
    include: {
      orderItem: true,
    },
    orderBy: { requestedAt: "desc" },
  });

  const formatted = claims.map((c) => ({
    id: c.id,
    type: c.claimType.toLowerCase(), // cancel | exchange | return
    requestedAt: c.requestedAt.toISOString().slice(0, 10),
    claimNumber: c.claimNumber,
    name: c.orderItem?.productName ?? "알 수 없음",
    img: c.orderItem?.productImage ?? "/sample.png",
    price: c.orderItem?.unitPrice.toString() ?? "0",
    quantity: c.orderItem?.quantity ?? 0,
    total: c.orderItem?.totalPrice.toString() ?? "0",
  }));

  return NextResponse.json(formatted);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "로그인이 필요합니다." },
      { status: 401 },
    );
  }

  const body = await req.json();
  const { orderItemIds, reason, detail, claimType } = body;

  if (!orderItemIds?.length) {
    return NextResponse.json(
      { message: "상품 선택이 필요합니다." },
      { status: 400 },
    );
  }

  // 선택한 상품들마다 Claim 생성
  try {
    const createdClaims = await Promise.all(
      orderItemIds.map((itemId: number) =>
        prisma.claim.create({
          data: {
            claimType,
            reason,
            detail,
            orderItem: {
              connect: { id: itemId },
            },
          },
        }),
      ),
    );

    return NextResponse.json({
      message: "반품/교환 신청 완료",
      claims: createdClaims,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "신청 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
