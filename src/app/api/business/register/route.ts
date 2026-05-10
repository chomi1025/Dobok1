import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    const userId = Number(session.user.id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { businessStatus: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "존재하지 않는 유저입니다." },
        { status: 404 },
      );
    }

    if (user.businessStatus === "PENDING") {
      return NextResponse.json(
        { error: "이미 신청 완료되어 검토 중인 유저입니다." },
        { status: 400 },
      );
    }

    if (user.businessStatus === "APPROVED") {
      return NextResponse.json(
        { error: "이미 승인된 사업자 회원입니다." },
        { status: 400 },
      );
    }
    const { companyName, businessNumber, representative, taxEmail, paperUrl } =
      await req.json();

    if (
      !companyName ||
      !businessNumber ||
      !representative ||
      !taxEmail ||
      !paperUrl
    ) {
      return NextResponse.json(
        { error: "모든 필수 항목을 입력해주세요." },
        { status: 400 },
      );
    }

    const existingBusiness = await prisma.businessInfo.findUnique({
      where: { businessNumber },
    });

    if (existingBusiness) {
      return NextResponse.json(
        { error: "이미 등록되거나 신청 진행 중인 사업자 번호입니다." },
        { status: 400 },
      );
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { businessStatus: "PENDING" },
      }),

      prisma.businessInfo.create({
        data: {
          userId,
          companyName,
          businessNumber,
          representative,
          taxEmail,
          paperUrl,
        },
      }),
    ]);

    return NextResponse.json({ success: true, message: "사업자 신청 완료" });
  } catch (error) {
    console.error("사업자 등록 API 에러:", error);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 },
    );
  }
}
