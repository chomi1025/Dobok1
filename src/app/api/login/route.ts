import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, password } = body;

    if (!id || !password) {
      return createCorsResponse(
        { error: "아이디와 비밀번호를 입력해주세요." },
        400,
      );
    }

    const user = await prisma.user.findUnique({
      where: { username: id },
    });

    if (!user) {
      return createCorsResponse({ error: "가입되지 않은 아이디입니다." }, 401);
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return createCorsResponse({ error: "비밀번호가 틀렸습니다." }, 401);
    }

    return createCorsResponse(
      {
        ok: true,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          phone: user.phone,
          address: user.address,
          birthDate: user.birthDate,
        },
      },
      200,
    );
  } catch (err) {
    console.error(err);
    return createCorsResponse(
      { error: "로그인 처리 중 오류가 발생했습니다." },
      500,
    );
  }
}

function createCorsResponse(data: any, status: number) {
  const response = NextResponse.json(data, { status });

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );

  return response;
}
