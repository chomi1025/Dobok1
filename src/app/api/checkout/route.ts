// app/api/checkout/route.ts (POST)
import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { ids } = await req.json();
  const productIds = ids.map(Number);

  const cartItems = await prisma.cartItem.findMany({
    where: {
      userId: Number(session.user.id),
      productId: { in: productIds },
    },
    include: {
      product: true,
      option: true,
    },
  });

  if (cartItems.length === 0) {
    return NextResponse.json(
      { error: "선택한 상품이 존재하지 않음" },
      { status: 400 },
    );
  }

  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * (item.option?.price || 0),
    0,
  );

  return NextResponse.json({ success: true, items: cartItems, total });
}
