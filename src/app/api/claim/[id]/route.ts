import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "로그인이 필요합니다." },
      { status: 401 },
    );
  }

  const currentUserId = Number(session.user.id);

  try {
    const claim = await prisma.claim.findUnique({
      where: {
        claimNumber: params.id,
      },
      include: {
        orderItem: true,
      },
    });

    if (!claim) {
      return NextResponse.json(
        { message: "클레임을 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    if (claim.userId !== currentUserId) {
      return NextResponse.json(
        { message: "본인 클레임만 조회할 수 있습니다." },
        { status: 403 },
      );
    }

    return NextResponse.json({
      claimNumber: claim.claimNumber,
      claimType: claim.claimType,
      status: claim.status,
      requestedAt: claim.requestedAt,
      processedAt: claim.processedAt,

      reason: claim.reason ?? "",
      detail: claim.detail ?? "",

      name: claim.orderItem?.productName,
      img: claim.orderItem?.productImage,
      quantity: claim.orderItem?.quantity,
      total: claim.orderItem?.totalPrice,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "클레임 조회 실패" }, { status: 500 });
  }
}
