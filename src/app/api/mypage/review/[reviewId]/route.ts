import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import sanitizeHtml from "sanitize-html";

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
        reply: true,
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

/* =========================
   PUT: 리뷰 수정 (sanitize-html 적용)
========================= */
export async function PUT(req: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reviewId = Number(params.reviewId);
    const userId = Number(session.user.id);
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "내용을 입력해주세요" },
        { status: 400 },
      );
    }

    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review || review.userId !== userId) {
      return NextResponse.json({ error: "권한 없음" }, { status: 403 });
    }

    // 🔹 sanitize-html 적용
    const cleanContent = sanitizeHtml(content, {
      allowedTags: ["p", "br", "strong", "em", "ul", "ol", "li", "img"],
      allowedAttributes: {
        img: ["src", "alt", "width", "height"],
      },
    });

    const updated = await prisma.review.update({
      where: { id: reviewId },
      data: {
        content: cleanContent, // 안전하게 저장
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("❌ 리뷰 수정 에러:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reviewId = Number(params.reviewId);
    const userId = Number(session.user.id);
    const role = session.user.role; // "admin" | "user"

    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      return NextResponse.json({ error: "리뷰 없음" }, { status: 404 });
    }

    if (role !== "admin" && review.userId !== userId) {
      return NextResponse.json({ error: "권한 없음" }, { status: 403 });
    }

    await prisma.reviewReply.deleteMany({
      where: { reviewId },
    });

    await prisma.review.delete({
      where: { id: reviewId },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ 리뷰 삭제 에러:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}
