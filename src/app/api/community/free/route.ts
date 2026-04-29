import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    const { title, content } = await request.json();

    const post = await prisma.post.create({
      data: {
        title,
        content,
        type: "FREE",
        authorId: Number(session.user.id),
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Post Creation Error:", error);
    return NextResponse.json({ error: "글 등록 실패" }, { status: 500 });
  }
}
