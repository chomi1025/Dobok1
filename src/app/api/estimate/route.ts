import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const body = await request.json();

    const {
      title,
      content,
      writer,
      phone,
      email,
      productId,
      quantity,
      password,
    } = body;

    // 유효성 검사
    if (!title || !content || !writer || !phone) {
      return NextResponse.json(
        {
          message: "필수 항목을 입력해주세요.",
        },
        {
          status: 400,
        },
      );
    }

    if (!session && !password) {
      return NextResponse.json(
        {
          message: "비밀번호를 입력해주세요.",
        },
        {
          status: 400,
        },
      );
    }

    let hashedPassword = null;

    // 비회원
    if (!session && password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const estimatePost = await prisma.estimatePost.create({
      data: {
        title,
        content,
        writer,
        phone,
        email,
        quantity,
        isSecret: true,
        userId: Number(session?.user.id) ?? null,
        password: hashedPassword,
        status: "WAITING",
        productId,
      },
    });

    return NextResponse.json(
      {
        message: "견적문의가 등록되었습니다.",
        estimatePost,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "견적문의 등록 실패",
      },
      {
        status: 500,
      },
    );
  }
}
