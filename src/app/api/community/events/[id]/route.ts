import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user)
      return NextResponse.json({ error: "로그인 필요" }, { status: 401 });

    const postId = Number(params.id);

    const { title, content, category, city, district, eventVenue, eventDate } =
      await request.json();

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post)
      return NextResponse.json({ error: "게시글 없음" }, { status: 404 });

    if (!post.authorId) {
      return NextResponse.json(
        { error: "작성자 정보가 없는 게시글입니다." },
        { status: 403 },
      );
    }

    if (
      post.authorId !== Number(session.user.id) &&
      session.user.role !== "ADMIN"
    ) {
      return NextResponse.json({ error: "권한 없음" }, { status: 403 });
    }

    // 히스토리 저장
    await prisma.postEditHistory.create({
      data: {
        postId,
        title: post.title,
        content: post.content,
        editedAt: new Date(),
      },
    });

    // 업데이트
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        category,
        city,
        district,
        eventVenue,
        eventDate: eventDate ? new Date(eventDate) : undefined,
      },
      include: {
        author: {
          select: { nickname: true },
        },
        comments: {
          include: {
            author: {
              select: { nickname: true },
            },
          },
        },
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "수정 실패" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    const postId = Number(params.id);

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) {
      return NextResponse.json(
        { error: "게시글을 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    const isOwner = post.authorId === Number(session.user.id);
    const isAdmin = session.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "삭제 권한이 없습니다." },
        { status: 403 },
      );
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ message: "삭제 성공" });
  } catch (error) {
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}
