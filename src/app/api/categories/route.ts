import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { parentId: null },
      include: {
        children: {
          orderBy: { sortOrder: "asc" },
        },
      },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "카테고리 조회 실패" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, slug, isVisible, parentId } = body;

    const newCategory = await prisma.category.create({
      data: {
        name,
        slug,
        isVisible,
        parentId,
      },
    });

    return NextResponse.json(newCategory);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "에러 발생" }, { status: 500 });
  }
}
