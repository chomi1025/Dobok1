import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId, quantity, productOptionId } = await req.json();

  const userId = Number(session.user.id);

  const existing = await prisma.cartItem.findFirst({
    where: {
      userId,
      productId,
    },
  });

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        userId,
        productId,
        productOptionId,
        quantity,
      },
    });
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cartItems = await prisma.cartItem.findMany({
    where: {
      userId: Number(session.user.id),
    },
    include: {
      product: true,
    },
  });

  return NextResponse.json(cartItems);
}
