import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nickname = searchParams.get("nickname")?.trim();

  if (!nickname) {
    return NextResponse.json(
      { error: "닉네임을 입력해주세요!" },
      { status: 400 },
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { status: "ACTIVE", nickname },
    });

    const exists = !!user;

    return NextResponse.json({ exists });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
