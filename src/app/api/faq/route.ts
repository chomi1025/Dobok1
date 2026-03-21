import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { category, question, answer } = body;

    if (!category || !question || !answer) {
      return NextResponse.json(
        { message: "필드값이 부족합니다." },
        { status: 400 },
      );
    }

    const newFaq = await prisma.faq.create({
      data: {
        category,
        question,
        answer,
        sortOrder: 0,
      },
    });

    return NextResponse.json(newFaq, { status: 201 });
  } catch (error) {
    console.error("FAQ POST 에러:", error);
    return NextResponse.json({ message: "서버 저장 실패" }, { status: 500 });
  }
}
