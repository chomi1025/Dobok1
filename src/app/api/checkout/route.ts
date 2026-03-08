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

  const { ids } = await req.json(); // 클라이언트에서 보낸 선택 상품 ID 배열
  const productIds = ids.map(Number);

  // DB에서 실제 유저 장바구니에 있는 상품만 가져오기
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

  // 가격 계산 등 처리
  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * (item.option?.price || 0),
    0,
  );

  return NextResponse.json({ success: true, items: cartItems, total });
}
