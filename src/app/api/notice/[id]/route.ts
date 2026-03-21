import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth/options";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === "ADMIN";
    if (!isAdmin) {
      return NextResponse.json(
        { message: "권한이 없습니다." },
        { status: 403 },
      );
    }

    const id = Number(params.id);

    await prisma.notice.delete({
      where: { id },
    });

    return NextResponse.json({ message: "삭제 성공" }, { status: 200 });
  } catch (error) {
    console.error("Notice DELETE 에러:", error);
    return NextResponse.json(
      { message: "삭제 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
  }

  try {
    const { title, content } = await req.json();
    const noticeId = Number(params.id);

    const updatedNotice = await prisma.notice.update({
      where: { id: noticeId },
      data: { title, content },
    });

    return NextResponse.json(updatedNotice);
  } catch (error) {
    return NextResponse.json({ message: "수정 중 에러 발생" }, { status: 500 });
  }
}
