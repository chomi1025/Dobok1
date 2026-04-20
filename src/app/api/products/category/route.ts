import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CategoryApiResponse } from "@/types/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mainSlug = searchParams.get("mainSlug") || "";
  const subSlug = searchParams.get("subSlug");
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = 12;

  const productWhere =
    subSlug && subSlug !== "all"
      ? { category: { slug: subSlug } }
      : { category: { parent: { slug: mainSlug } } };

  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: productWhere,
        include: { category: { include: { parent: true } }, options: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.product.count({ where: productWhere }),
    ]);

    const responseData: CategoryApiResponse = {
      products: products as any,
      total,
    };
    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json({ message: "로드 실패" }, { status: 500 });
  }
}
