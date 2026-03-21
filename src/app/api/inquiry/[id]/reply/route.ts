import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const inquiryId = Number(params.id);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "권한이 없습니다." },
        { status: 403 },
      );
    }

    const { content } = await req.json();
    const adminId = Number(session.user.id);

    const [reply, updatedInquiry] = await prisma.$transaction([
      prisma.inquiryReply.create({
        data: {
          content,
          inquiry: {
            connect: { id: inquiryId },
          },
          admin: {
            connect: { id: adminId },
          },
        },
      }),
      prisma.inquiry.update({
        where: { id: inquiryId },
        data: { status: "COMPLETED" },
      }),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "답변이 등록되었습니다.",
        data: reply,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("REPLY_POST_ERROR:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const inquiryId = Number(params.id);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "권한이 없습니다." },
        { status: 403 },
      );
    }

    const { content } = await req.json();

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { message: "내용을 입력해주세요." },
        { status: 400 },
      );
    }

    const updatedReply = await prisma.inquiryReply.updateMany({
      where: {
        inquiryId: inquiryId,
      },
      data: {
        content: content,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "답변이 수정되었습니다.",
        data: updatedReply,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("REPLY_PATCH_ERROR:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const inquiryId = Number(params.id);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "권한이 없습니다." },
        { status: 403 },
      );
    }

    await prisma.inquiryReply.delete({
      where: { inquiryId: inquiryId },
    });

    return NextResponse.json({
      success: true,
      message: "답변이 삭제되었습니다.",
    });
  } catch (error) {
    console.error("REPLY_DELETE_ERROR:", error);
    return NextResponse.json(
      { message: "답변 삭제 중 오류 발생" },
      { status: 500 },
    );
  }
}
