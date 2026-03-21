import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content } = body;

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
        isFixed: false,
      },
    });

    return NextResponse.json(newNotice, { status: 201 });
  } catch (error) {
    console.error("Notice POST 에러:", error);
    return NextResponse.json({ message: "서버 저장 실패" }, { status: 500 });
  }
}
