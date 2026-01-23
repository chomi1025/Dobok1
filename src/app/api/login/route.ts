import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, password } = body;

    // 1️⃣ 입력 체크
    if (!id || !password) {
      return NextResponse.json(
        { error: "아이디와 비밀번호를 입력해주세요." },
        { status: 400 },
      );
    }

    // 2️⃣ username 기준 유저 조회
    const user = await prisma.user.findUnique({
      where: { username: id }, // 여기서 id → username 매핑
    });

    if (!user) {
      return NextResponse.json(
        { error: "가입되지 않은 아이디입니다." },
        { status: 401 },
      );
    }

    // 3️⃣ 비밀번호 검증
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "비밀번호가 틀렸습니다." },
        { status: 401 },
      );
    }

    // 4️⃣ 로그인 성공
    // 여기서 JWT 발급하거나 쿠키 세션 추가 가능
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
