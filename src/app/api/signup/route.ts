import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, username, name, phone, address, birth_date } =
      body;

    // 1️⃣ 중복 이메일 체크
    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      return NextResponse.json(
        { error: "이미 가입된 이메일입니다." },
        { status: 400 },
      );
    }

    // 2️⃣ 비밀번호 해시
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ 유저 생성
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        name,
        phone,
        address,
        birthDate: birth_date ? new Date(birth_date) : null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "회원가입 실패" }, { status: 500 });
  }
}
