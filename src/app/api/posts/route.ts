import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_TYPES = ["JOB", "FREE", "EVENT", "RESOURCE"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "FREE";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 15;

  const skip = (page - 1) * limit;

  if (!VALID_TYPES.includes(type)) {
    return NextResponse.json(
      { error: "잘못된 게시판 타입입니다." },
      { status: 400 },
    );
  }

  try {
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: { type: type as any },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: skip,
        include: {
          author: { select: { nickname: true } },
          _count: { select: { comments: true } },
        },
      }),
      prisma.post.count({
        where: { type: type as any },
      }),
    ]);

    return NextResponse.json({ posts, total });
  } catch (error) {
    console.error("게시글 불러오기 에러:", error);
    return NextResponse.json(
      { error: "데이터를 불러오는 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
