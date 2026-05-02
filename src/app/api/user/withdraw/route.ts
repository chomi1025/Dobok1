import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { password, reason, reasonText } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(session.user.id) },
    });

    if (!user) {
      return NextResponse.json(
        { message: "유저를 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    if (user.isDeleted) {
      return NextResponse.json(
        { message: "이미 탈퇴한 계정입니다." },
        { status: 400 },
      );
    }

    // 비밀번호 확인
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "비밀번호가 일치하지 않습니다." },
        { status: 400 },
      );
    }

    // 삭제
    await prisma.user.update({
      where: { id: Number(session.user.id) },
      data: {
        status: "WITHDRAWN",
        deletedAt: new Date(),
        email: `withdrawn_${session.user.id}_${Date.now()}@deleted.com`,
        username: `withdrawn_${session.user.id}_${Date.now()}`,
        nickname: null,
        phone: null,
      },
    });

    await prisma.userWithdrawReason.create({
      data: {
        userId: user.id,
        reason,
        detail: reasonText,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "탈퇴 실패" }, { status: 500 });
  }
}
