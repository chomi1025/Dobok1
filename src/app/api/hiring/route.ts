import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log("현재 세션 유저 정보:", session?.user);
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    const body = await req.json();

    const {
      title,
      content,
      companyName,
      jobRole,
      experience,
      city,
      district,

      applyMethod,
    } = body;

    const newPost = await prisma.post.create({
      data: {
        type: "JOB",
        jobType: "HIRING",
        title,
        content,
        companyName,
        jobRole,
        experience: experience,
        city,
        district,
        applyMethod,
        authorId: Number(session.user.id),
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "공고 등록 중 에러가 발생했습니다.",
        detail: error.message,
      },
      { status: 500 },
    );
  }
}
