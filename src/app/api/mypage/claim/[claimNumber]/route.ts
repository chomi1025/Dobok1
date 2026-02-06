// app/api/mypage/claims/[claimNumber]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

interface Params {
  params: { claimNumber: string };
}

export async function GET(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "로그인이 필요합니다." },
      { status: 401 },
    );
  }

  const claim = await prisma.claim.findUnique({
    where: { claimNumber: params.claimNumber },
    include: {
      orderItem: {
        include: {
          order: true, // order 정보까지 필요하면
        },
      },
    },
  });

  if (!claim)
    return NextResponse.json(
      { message: "클레임을 찾을 수 없습니다." },
      { status: 404 },
    );
  if (!claim.orderItem)
    return NextResponse.json(
      { message: "주문 상품 정보가 없습니다." },
      { status: 400 },
    );
  if (claim.orderItem.order.userId !== Number(session.user.id))
    return NextResponse.json({ message: "권한 없음" }, { status: 403 });

  // 원하는 필드만 가공
  const formatted = {
    id: claim.id,
    type: claim.claimType,
    requestedAt: claim.requestedAt.toISOString().slice(0, 10),
    claimNumber: claim.claimNumber,
    name: claim.orderItem?.productName ?? "알 수 없음",
    img: claim.orderItem?.productImage ?? "/sample.png",
    price: claim.orderItem?.unitPrice.toString() ?? "0",
    quantity: claim.orderItem?.quantity ?? 0,
    total: claim.orderItem?.totalPrice.toString() ?? "0",
    reason: claim.reason,
    detail: claim.detail,
    status: claim.status,
    processedAt: claim.processedAt?.toISOString() ?? null,
  };

  return NextResponse.json(formatted);
}
