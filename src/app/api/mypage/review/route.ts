import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { Prisma } from "@prisma/client";
export const dynamic = "force-dynamic";

type OrderItemWithReviews = Prisma.OrderItemGetPayload<{
  include: { reviews: true };
}>;

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = Number(session.user.id);

    const orderItems = await prisma.orderItem.findMany({
      where: { order: { userId } },
      include: { reviews: true },
      orderBy: { createdAt: "desc" },
    });

    const formattedReviews = orderItems.map((item: OrderItemWithReviews) => ({
      id: item.id,
      productName: item.productName,
      img: item.productImage || "/sample.png",
      deliveredAt: item.createdAt.toISOString().split("T")[0],
      reviewStatus: item.reviews ? "리뷰작성완료" : "리뷰작성가능",
      reviewId: item.reviews?.id,
    }));

    return NextResponse.json(formattedReviews);
  } catch (err) {
    console.error(" route error:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
