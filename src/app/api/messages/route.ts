import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    const { receiverId, content, postId } = await req.json();

    if (!receiverId || !content) {
      return NextResponse.json(
        { message: "데이터가 부족합니다." },
        { status: 400 },
      );
    }

    if (Number(session.user.id) === receiverId) {
      return NextResponse.json(
        { message: "본인에게는 보낼 수 없습니다." },
        { status: 400 },
      );
    }

    const newMessage = await prisma.message.create({
      data: {
        content,
        senderId: Number(session.user.id),
        receiverId: Number(receiverId),
        postId: postId ? Number(postId) : null,
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Message API Error:", error);
    return NextResponse.json(
      { message: "서버 에러가 발생했습니다." },
      { status: 500 },
    );
  }
}
