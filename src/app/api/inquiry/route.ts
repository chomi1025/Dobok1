import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { category, title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "제목과 내용을 입력해주세요." },
        { status: 400 },
      );
    }
    console.log(body);

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const newInquiry = await prisma.inquiry.create({
      data: {
        userId: Number(userId),
        category,
        title,
        content,
        status: "WAITING",
      },
    });

    return NextResponse.json(newInquiry, { status: 201 });
  } catch (error) {
    console.error("문의 등록 에러:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
