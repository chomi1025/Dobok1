// src/app/api/mypage/review/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

export async function GET(req: Request) {
  try {
    // 1️⃣ 세션 가져오기
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = Number(session.user.id);

    // 2️⃣ OrderItem 기준으로 가져오기 + 리뷰 포함
    const orderItems = await prisma.orderItem.findMany({
      where: { order: { userId } }, // 본인 주문만
      include: { reviews: true },
      orderBy: { createdAt: "desc" },
    });

    // 3️⃣ 프론트용 포맷 변환
    const formattedReviews = orderItems.map((item) => ({
      id: item.id,
      productName: item.productName,
      img: item.productImage || "/sample.png",
      deliveredAt: item.createdAt.toISOString().split("T")[0],
      reviewStatus: item.reviews.length > 0 ? "리뷰작성완료" : "리뷰작성가능",
      reviewId: item.reviews[0]?.id, // 이미 리뷰 있으면 ID
    }));

    return NextResponse.json(formattedReviews);
  } catch (err) {
    console.error("❌ route error:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
