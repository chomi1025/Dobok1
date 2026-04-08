import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ids = searchParams.get("ids");

  if (!ids) return NextResponse.json([]);

  const optionIds = ids.split(",").map(Number);

  const options = await prisma.productOption.findMany({
    where: { id: { in: optionIds } },
    include: { product: true },
  });

  return NextResponse.json(options);
}
