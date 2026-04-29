import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, isFixed } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "필드값이 부족합니다." },
        { status: 400 },
      );
    }

    const newNotice = await prisma.notice.create({
      data: {
        title,
        content,
        isFixed: isFixed,
      },
    });

    return NextResponse.json(newNotice, { status: 201 });
  } catch (error) {
    console.error("Notice POST 에러:", error);
    return NextResponse.json({ message: "서버 저장 실패" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const skip = (page - 1) * pageSize;

  try {
    const [fixedNotices, pagedNormalNotices, totalCount] = await Promise.all([
      prisma.notice.findMany({
        where: { isFixed: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.notice.findMany({
        where: { isFixed: false },
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.notice.count({ where: { isFixed: false } }),
    ]);

    return NextResponse.json({
      allNotices: [...fixedNotices, ...pagedNormalNotices],
      total: totalCount,
    });
  } catch (error) {
    return NextResponse.json({ error: "데이터 로드 실패" }, { status: 500 });
  }
}
