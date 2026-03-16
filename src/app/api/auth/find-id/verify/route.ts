import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    const record = await prisma.verification.findUnique({
      where: { email },
    });

    if (!record || record.code !== code) {
      return NextResponse.json(
        { message: "인증번호가 일치하지 않습니다. 다시 확인해주세요." },
        { status: 400 },
      );
    }

    const isExpired =
      new Date().getTime() - new Date(record.createdAt).getTime() >
      5 * 60 * 1000;
    if (isExpired) {
      return NextResponse.json(
        { message: "인증 시간이 만료되었습니다." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { username: true },
    });

    const originalId = user?.username || "";

    let maskedId = "";

    if (!originalId) {
      return NextResponse.json(
        { message: "사용자 정보를 찾을 수 없어." },
        { status: 404 },
      );
    }

    if (originalId.length > 4) {
      maskedId = originalId.substring(0, 4) + "*".repeat(originalId.length - 4);
    } else {
      maskedId = originalId.substring(0, 2) + "*".repeat(originalId.length - 2);
    }

    await prisma.verification.delete({ where: { email } });

    return NextResponse.json({ success: true, maskedId });
  } catch (error) {
    console.error("검증 에러:", error);
    return NextResponse.json({ message: "서버 에러 발생" }, { status: 500 });
  }
}
