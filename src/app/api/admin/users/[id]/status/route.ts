import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { UserStatus } from "@prisma/client";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = Number(params.id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { message: "유효하지 않은 ID입니다." },
        { status: 400 },
      );
    }

    const { status } = await request.json();

    const validStatuses: UserStatus[] = ["ACTIVE", "BANNED", "WITHDRAWN"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { message: "유효하지 않은 상태 값입니다." },
        { status: 400 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      message: `회원 상태가 ${status}로 변경되었습니다.`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("User Status Update API Error:", error);
    return NextResponse.json(
      { message: "서버 내부 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
