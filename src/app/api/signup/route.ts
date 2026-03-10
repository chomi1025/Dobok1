// src/app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      email,
      username,
      password,
      passwordConfirm,
      name,
      phone,
      birth_date,
      address,
    } = body;

    // 1️⃣ 비밀번호 확인
    if (!password || password.trim() !== passwordConfirm?.trim()) {
      return NextResponse.json(
        { error: "비밀번호 확인이 일치하지 않습니다." },
        { status: 400 },
      );
    }

    const phoneStr = phone || null;

    const birth = birth_date ? new Date(birth_date) : null;
    if (!birth || isNaN(birth.getTime())) {
      return NextResponse.json(
        { error: "잘못된 생년월일입니다." },
        { status: 400 },
      );
    }
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
          ...(phoneStr ? [{ phone: phoneStr }] : []),
        ],
      },
    });

    if (existingUser) {
      const duplicateFields = [];
      if (existingUser.email === email) duplicateFields.push("email");
      if (existingUser.username === username) duplicateFields.push("username");
      if (phoneStr && existingUser.phone === phoneStr)
        duplicateFields.push("phone");

      return NextResponse.json(
        { error: `이미 존재하는 ${duplicateFields.join(", ")}입니다.` },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        name,
        phone: phoneStr,
        birthDate: birth,
        address,
      },
    });

    return NextResponse.json(
      { message: "회원가입 완료!", userId: user.id },
      { status: 201 },
    );
  } catch (err: any) {
    console.error("회원가입 에러:", err);
    return NextResponse.json(
      { error: "회원가입 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
