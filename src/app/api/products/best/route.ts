import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = 12;

  try {
    const [totalItems, products] = await Promise.all([
      prisma.product.count({ where: { isBest: true } }),
      prisma.product.findMany({
        where: { isBest: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          options: true,
          category: true,
        },
      }),
    ]);

    return NextResponse.json({ products, totalItems, pageSize });
  } catch (error) {
    return NextResponse.json({ message: "데이터 로드 실패" }, { status: 500 });
  }
}
