import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    const body = await req.json();

    const {
      title,
      content,
      category,
      eventDate,
      city,
      district,
      eventVenue,
      authorNickname,
    } = body;

    if (
      !title?.trim() ||
      !content?.trim() ||
      !category ||
      !eventDate ||
      !city ||
      !district ||
      !eventVenue ||
      !authorNickname
    ) {
      return NextResponse.json(
        { message: "필수값이 누락되었습니다." },
        { status: 400 },
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        type: "EVENT",
        eventCategory: category,
        eventVenue: eventVenue,
        eventDate: new Date(eventDate),
        city,
        district,

        authorId: Number(session.user.id),
        authorNickname,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
