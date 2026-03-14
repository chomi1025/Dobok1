import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth/options";

interface Params {
  params: { reviewId: string };
}

export async function POST(req: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "관리자만 가능" }, { status: 403 });
    }

    const adminId = Number(session.user.id);

    const reviewId = Number(params.reviewId);
    if (isNaN(reviewId)) {
      return NextResponse.json({ error: "잘못된 ID" }, { status: 400 });
    }

    const body = await req.json();
    const { content } = body;
    if (!content) {
      return NextResponse.json(
        { error: "답변 내용을 입력해주세요" },
        { status: 400 },
      );
    }

    let reply = await prisma.reviewReply.findUnique({
      where: { reviewId },
    });

    if (reply) {
      reply = await prisma.reviewReply.update({
        where: { reviewId },
        data: { content, adminId },
      });
    } else {
      reply = await prisma.reviewReply.create({
        data: {
          content,
          adminId,
          reviewId,
        },
      });
    }

    return NextResponse.json(reply);
  } catch (err) {
    console.error(" 리뷰 답변 등록 에러:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}
