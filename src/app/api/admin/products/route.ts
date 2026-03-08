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

export async function Delete() {
  try {
  } catch (err) {
    return NextResponse.json(err);
  }
}
