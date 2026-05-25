import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { cookies } from "next/headers";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const cookieStore = cookies();

    const body = await req.json();
    const { title, content, writer, phone, email, password, productId } = body;

    const estimate = await prisma.estimatePost.findUnique({
      where: { id: params.id },
    });

    if (!estimate) {
      return NextResponse.json(
        { message: "게시글이 존재하지 않습니다." },
        { status: 404 },
      );
    }

    const isOwner =
      estimate.userId && session && Number(session.user.id) === estimate.userId;

    const cookie = cookieStore.get(`estimate_access_${params.id}`);
    const hasAccess = isOwner || cookie;

    if (!hasAccess) {
      return NextResponse.json(
        { message: "수정 권한이 없습니다." },
        { status: 403 },
      );
    }

    const before = await prisma.estimatePost.findUnique({
      where: { id: params.id },
    });

    const updated = await prisma.estimatePost.update({
      where: { id: params.id },
      data: {
        title,
        content,
        writer,
        phone,
        email,
        productId,
      },
    });

    // 히스토리
    await prisma.estimatePostHistory.create({
      data: {
        estimateId: params.id,
        before: JSON.stringify(before),
        after: JSON.stringify(updated),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  const isAdmin = session?.user?.role === "ADMIN";

  const estimate = await prisma.estimatePost.findUnique({
    where: { id: params.id },
  });

  if (!estimate) {
    return NextResponse.json({ message: "없음" }, { status: 404 });
  }

  const cookie = cookies().get(`estimate_access_${params.id}`);
  const isOwner =
    estimate.userId && session && Number(session.user.id) === estimate.userId;

  if (!isOwner && !isAdmin && !cookie) {
    return NextResponse.json({ message: "권한 없음" }, { status: 403 });
  }

  await prisma.estimatePost.update({
    where: { id: params.id },
    data: {
      deletedAt: new Date(),
    },
  });

  return NextResponse.json({ success: true });
}
