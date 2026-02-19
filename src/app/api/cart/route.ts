import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { productId, quantity } = await req.json();

  // TODO: 로그인 유저 ID 가져오기
  const userId = 1;

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
        quantity,
      },
    });
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  const userId = 1; // 🔥 나중에 로그인 세션으로 바꿔야 함

  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: {
      product: true, // 상품 정보 같이 가져오기
    },
  });

  return NextResponse.json(cartItems);
}
