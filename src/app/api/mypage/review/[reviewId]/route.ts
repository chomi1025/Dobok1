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

// ✅ POST: 답변 등록
export async function POST(req: Request, { params }: Params) {
  try {
    const reviewId = Number(params.reviewId);
    if (isNaN(reviewId))
      return NextResponse.json({ error: "잘못된 ID" }, { status: 400 });

    const body = await req.json();
    const { content } = body;

    if (!content)
      return NextResponse.json(
        { error: "답변 내용을 입력해주세요" },
        { status: 400 },
      );

    // 답변 DB 저장 (review와 1:1 관계라고 가정)
    const reply = await prisma.reply.create({
      data: {
        content,
        review: { connect: { id: reviewId } },
      },
    });

    return NextResponse.json(reply);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}
