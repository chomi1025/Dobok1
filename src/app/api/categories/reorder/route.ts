import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  try {
    const { orders } = await request.json();
    await prisma.$transaction(
      orders.map((item: any) =>
        prisma.category.update({
          where: {
            id: isNaN(Number(item.id)) ? item.id : Number(item.id),
          },
          data: { sortOrder: Number(item.sortOrder) },
        }),
      ),
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(" 순서 재배치 에러:", error.message);
    return NextResponse.json(
      { error: "순서 저장 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
