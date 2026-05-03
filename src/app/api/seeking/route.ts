import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { title, city, district, jobRole, experience, content, applyMethod } =
      body;

    const user = await prisma.user.findUnique({
      where: { id: Number(session.user.id) },
      select: { nickname: true, name: true },
    });

    const newJobPost = await prisma.post.create({
      data: {
        title,
        city,
        district,
        jobRole,
        experience,
        content,
        applyMethod,
        type: "JOB",
        jobType: "SEEKING",

        author: {
          connect: {
            id: Number(session.user.id),
          },
        },

        authorNickname: user?.nickname || user?.name || "개인",
      },
    });

    return NextResponse.json(
      {
        message: "구직 게시글이 등록되었습니다.",
        id: newJobPost.id,
        jobType: newJobPost.jobType,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("구직 등록 에러:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
