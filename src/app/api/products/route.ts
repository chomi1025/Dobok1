import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page") || 1);

    const limit = Number(searchParams.get("limit") || 20);

    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },

      skip,
      take: limit,

      select: {
        id: true,
        name: true,
        thumbnail: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.product.count({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json({
      products,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "상품 조회 실패",
      },
      {
        status: 500,
      },
    );
  }
}
