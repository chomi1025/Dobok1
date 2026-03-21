import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const inquiryId = Number(params.id);

    if (!session) {
      return NextResponse.json(
        { message: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    const inquiry = await prisma.inquiry.findUnique({
      where: { id: inquiryId },
    });

    if (!inquiry) {
      return NextResponse.json(
        { message: "글을 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    const isOwner = inquiry.userId === Number(session.user.id);
    const isAdmin = session.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { message: "삭제 권한이 없습니다." },
        { status: 403 },
      );
    }

    await prisma.$transaction([
      prisma.inquiryReply.deleteMany({ where: { inquiryId } }),
      prisma.inquiry.delete({ where: { id: inquiryId } }),
    ]);

    return NextResponse.json({ success: true, message: "삭제되었습니다." });
  } catch (error) {
    console.error("DELETE_ERROR:", error);
    return NextResponse.json({ message: "삭제 중 오류 발생" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const inquiryId = Number(params.id);

    if (!session)
      return NextResponse.json(
        { message: "로그인이 필요합니다." },
        { status: 401 },
      );

    const existingInquiry = await prisma.inquiry.findUnique({
      where: { id: inquiryId },
    });

    if (!existingInquiry)
      return NextResponse.json(
        { message: "글을 찾을 수 없습니다." },
        { status: 404 },
      );

    if (existingInquiry.userId !== Number(session.user.id)) {
      return NextResponse.json(
        { message: "수정 권한이 없습니다." },
        { status: 403 },
      );
    }

    const body = await req.json();
    const { category, title, content } = body;

    const updatedInquiry = await prisma.inquiry.update({
      where: { id: inquiryId },
      data: { category, title, content },
    });

    return NextResponse.json(updatedInquiry);
  } catch (error) {
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
