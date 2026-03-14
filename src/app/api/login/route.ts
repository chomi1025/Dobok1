import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, password } = body;

    if (!id || !password) {
      return NextResponse.json(
        { error: "아이디와 비밀번호를 입력해주세요." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { username: id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "가입되지 않은 아이디입니다." },
        { status: 401 },
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "비밀번호가 틀렸습니다." },
        { status: 401 },
      );
    }

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        phone: user.phone,
        address: user.address,
        birthDate: user.birthDate,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "로그인 처리 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
