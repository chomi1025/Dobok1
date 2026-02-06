import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth/options";

interface Params {
  params: { reviewId: string };
}

// ✅ POST: 리뷰 답변 등록
export async function POST(req: Request, { params }: Params) {
  try {
    // 1️⃣ 세션에서 로그인 admin 확인
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "관리자만 가능" }, { status: 403 });
    }

    const adminId = Number(session.user.id); // 로그인한 admin ID

    // 2️⃣ 리뷰 ID 확인
    const reviewId = Number(params.reviewId);
    if (isNaN(reviewId)) {
      return NextResponse.json({ error: "잘못된 ID" }, { status: 400 });
    }

    // 3️⃣ 요청 바디 확인
    const body = await req.json();
    const { content } = body;
    if (!content) {
      return NextResponse.json(
        { error: "답변 내용을 입력해주세요" },
        { status: 400 },
      );
    }

    // 4️⃣ 기존 답변 있는지 확인 (1:1 관계)
    let reply = await prisma.reviewReply.findUnique({
      where: { reviewId },
    });

    if (reply) {
      // 이미 있으면 업데이트
      reply = await prisma.reviewReply.update({
        where: { reviewId },
        data: { content, adminId },
      });
    } else {
      // 없으면 생성
      reply = await prisma.reviewReply.create({
        data: {
          content,
          adminId,
          reviewId,
        },
      });
    }

    // 5️⃣ 저장된 답변 반환
    return NextResponse.json(reply);
  } catch (err) {
    console.error("❌ 리뷰 답변 등록 에러:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}
