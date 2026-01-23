import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "아이디를 입력해주세요!" },
      { status: 400 },
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username }, // DB에서 username 컬럼 기준 조회
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
