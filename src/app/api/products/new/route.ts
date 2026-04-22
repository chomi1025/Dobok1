import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const DISPLAY_COUNT = 12;

  try {
    const products = await prisma.product.findMany({
      where: { isNew: true },
      orderBy: { createdAt: "desc" },
      take: DISPLAY_COUNT,
      select: {
        id: true,
        name: true,
        description: true,
        thumbnail: true,
        isNew: true,
        isCustomizable: true,
        options: {
          select: { id: true, price: true, size: true, color: true },
        },
        category: { select: { name: true, slug: true } },
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ message: "데이터 로드 실패" }, { status: 500 });
  }
}
