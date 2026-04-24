import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        options: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const maincategories = await prisma.category.findMany({
      where: { parentId: null },
    });

    const subcategories = await prisma.category.findMany({
      where: { parentId: { not: null } },
    });

    return NextResponse.json({ products, maincategories, subcategories });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      name,
      description,
      categoryId,
      isCustomizable,
      thumbnail,
      images,
      options,
      optionNames,
    } = data;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        categoryId: Number(categoryId),
        isCustomizable: Boolean(isCustomizable),
        thumbnail,
        images,
        options: {
          create: options.map((opt: any) => ({
            optionName: optionNames.name1,
            optionName2: optionNames.name2,
            optionValue: opt.optionValue,
            optionValue2: opt.optionValue2,
            price: Number(opt.price),
            stock: Number(opt.stock),
            status: opt.status,
          })),
        },
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error("상품 등록 실패:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
