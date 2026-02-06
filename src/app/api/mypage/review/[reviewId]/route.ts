import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { reviewId: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const reviewId = Number(params.reviewId);
    if (isNaN(reviewId))
      return NextResponse.json({ error: "잘못된 ID" }, { status: 400 });

    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        orderItem: {
          include: {
            product: true,
          },
        },
        reply: true, // ✅ 답변도 같이 가져오기
      },
    });

    if (!review)
      return NextResponse.json({ error: "리뷰가 없습니다" }, { status: 404 });

    return NextResponse.json(review);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}
