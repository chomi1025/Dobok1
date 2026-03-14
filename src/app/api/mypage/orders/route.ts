import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "로그인이 필요합니다." },
      { status: 401 },
    );
  }

  const orders = await prisma.order.findMany({
    where: { userId: Number(session.user.id) },
    include: {
      items: {
        include: {
          claims: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const formatted = orders
    .map((o) => {
      if (!o.items.length) return null;

      const firstItem = o.items[0];
      const productCount = o.items.length;
      const totalQuantity = o.items.reduce((sum, i) => sum + i.quantity, 0);

      return {
        id: o.id,
        date: o.createdAt.toISOString().slice(0, 10),
        orderNumber: o.orderNumber,
        img: firstItem.productImage ?? "/sample.png",
        name:
          productCount > 1
            ? `${firstItem.productName} 외 ${productCount - 1}건`
            : firstItem.productName,
        quantity: totalQuantity,
        total: o.total,
        status: o.status,
        items: o.items,
        claims: o.items.flatMap((item) => item.claims ?? []),
      };
    })
    .filter(Boolean);

  return NextResponse.json(formatted);
}
