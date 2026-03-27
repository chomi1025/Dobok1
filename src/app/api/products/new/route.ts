import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");

  const products = await prisma.product.findMany({
    where: {
      isNew: true,
      ...(categoryId !== "all" && {
        category: { parentId: Number(categoryId) },
      }),
    },
    take: 8,
    include: {
      options: true,
      category: { include: { parent: true } },
    },
  });

  return NextResponse.json(products);
}
