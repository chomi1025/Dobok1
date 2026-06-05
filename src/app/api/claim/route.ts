import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { OrderItem } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "로그인이 필요합니다." },
      { status: 401 },
    );
  }

  const userId = Number(session.user.id);

  const claims = await prisma.claim.findMany({
    where: {
      userId,
    },
    include: {
      order: {
        include: {
          items: true,
        },
      },
    },
    orderBy: {
      requestedAt: "desc",
    },
  });

  const result = claims.map((claim: (typeof claims)[number]) => {
    const firstItem = claim.order?.items?.[0];

    const itemCount = claim.order?.items?.length ?? 0;

    return {
      id: claim.id,
      claimType: claim.claimType,
      requestedAt: claim.requestedAt,
      claimNumber: claim.claimNumber,

      name:
        itemCount > 1
          ? `${firstItem?.productName} 외 ${itemCount - 1}건`
          : (firstItem?.productName ?? ""),

      img: firstItem?.productImage ?? "",

      price: firstItem?.unitPrice ?? 0,

      quantity:
        itemCount > 1
          ? claim.order?.items.reduce(
              (sum: number, item: OrderItem) => sum + item.quantity,
              0,
            )
          : (firstItem?.quantity ?? 0),

      total: claim.order?.total ?? 0,
    };
  });

  return NextResponse.json(result);
}
