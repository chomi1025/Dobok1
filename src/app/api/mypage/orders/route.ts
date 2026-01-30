// app/api/mypage/orders/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { date: "desc" },
  });

  const formatted = orders.map((o) => ({
    id: o.id,
    date: o.date.toISOString().slice(0, 10),
    orderNumber: o.orderNumber,
    img: "/sample.png",
    name: o.items.map((i) => i.productName).join(", "),
    price: o.items.reduce((s, i) => s + i.unitPrice, 0),
    quantity: o.items.reduce((s, i) => s + i.quantity, 0),
    total: o.items.reduce((s, i) => s + i.totalPrice, 0),
    status: o.status,
  }));

  return NextResponse.json(formatted);
}
