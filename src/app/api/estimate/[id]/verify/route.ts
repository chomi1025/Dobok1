import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const body = await request.json();

    const password = body.password?.trim();

    if (!password) {
      return NextResponse.json(
        {
          message: "비밀번호를 입력해주세요.",
        },
        {
          status: 400,
        },
      );
    }

    const estimate = await prisma.estimatePost.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        password: true,
        isSecret: true,
      },
    });

    if (!estimate) {
      return NextResponse.json(
        {
          message: "존재하지 않는 문의입니다.",
        },
        {
          status: 404,
        },
      );
    }

    if (!estimate.isSecret) {
      return NextResponse.json(
        {
          success: true,
        },
        {
          status: 200,
        },
      );
    }

    if (!estimate.password) {
      return NextResponse.json(
        {
          message: "비밀번호가 일치하지 않습니다.",
        },
        {
          status: 400,
        },
      );
    }

    const isMatch = await bcrypt.compare(password, estimate.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          message: "비밀번호가 일치하지 않습니다.",
        },
        {
          status: 401,
        },
      );
    }

    const response = NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      },
    );

    response.cookies.set(`estimate_access_${id}`, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "인증 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      },
    );
  }
}
