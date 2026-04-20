import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = 12;

  try {
    const [totalItems, products] = await Promise.all([
      prisma.product.count({ where: { isNew: true } }),
      prisma.product.findMany({
        where: { isNew: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
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
      }),
    ]);

    return NextResponse.json({ products, totalItems });
  } catch (error) {
    return NextResponse.json({ message: "신제품 로드 실패" }, { status: 500 });
  }
}
