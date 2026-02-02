import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

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

    // 비밀번호 확인
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "비밀번호가 일치하지 않습니다." },
        { status: 400 },
      );
    }

    // 삭제
    await prisma.user.delete({ where: { id: user.id } });

    // -------------------------------
    // 탈퇴 로그 파일에 기록
    // -------------------------------
    const finalReason =
      reason === "other" ? reasonText?.trim() || "other" : reason || "none";

    const logFilePath = path.join(process.cwd(), "withdraw.log"); // 프로젝트 루트에 생성
    const logText = `User ${user.username} withdrew at ${new Date().toISOString()}. Reason: ${finalReason}\n`;

    fs.appendFile(logFilePath, logText, (err) => {
      if (err) console.error("로그 작성 실패:", err);
    });

    // 콘솔에도 남겨줌
    console.log(logText);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "탈퇴 실패" }, { status: 500 });
  }
}
