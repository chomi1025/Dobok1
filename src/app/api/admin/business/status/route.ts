import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const ALLOWED_STATUS = ["APPROVED", "REJECTED"];

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        {
          message: "권한이 없습니다.",
        },
        { status: 403 },
      );
    }

    const body = await req.json();

    const userId = Number(body.userId);
    const status = body.status;

    if (!userId || !status) {
      return NextResponse.json(
        { message: "잘못된 요청입니다." },
        { status: 400 },
      );
    }

    if (!ALLOWED_STATUS.includes(status)) {
      return NextResponse.json(
        { message: "허용되지 않은 상태값입니다." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "유저를 찾을 수 없습니다" },
        { status: 404 },
      );
    }

    await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        businessStatus: status,
        role: "BUSINESS",
      },
    });

    return NextResponse.json(
      {
        message: "사업자 승인 완료",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "서버 오류",
      },
      { status: 500 },
    );
  }
}
