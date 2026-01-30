// src/app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 프론트에서 언더스코어로 보낸 값
    const {
      email,
      username,
      password,
      passwordConfirm,
      name,
      phone,
      birth_date, // ✅ 언더스코어
      address,
    } = body;

    // 1️⃣ 비밀번호 확인
    if (!password || password.trim() !== passwordConfirm?.trim()) {
      return NextResponse.json(
        { error: "비밀번호 확인이 일치하지 않습니다." },
        { status: 400 },
      );
    }

    // 2️⃣ phone
    const phoneStr = phone || null; // 이미 문자열이므로 그대로 사용

    // 3️⃣ birth_date 문자열 → Date 변환 & 유효성 체크
    const birth = birth_date ? new Date(birth_date) : null;
    if (!birth || isNaN(birth.getTime())) {
      return NextResponse.json(
        { error: "잘못된 생년월일입니다." },
        { status: 400 },
      );
    }

    // 4️⃣ unique 필드 중복 체크
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
      return NextResponse.json(
        { error: "이미 존재하는 이메일, 아이디 또는 전화번호입니다." },
        { status: 400 },
      );
    }

    // 5️⃣ 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6️⃣ 유저 생성
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
