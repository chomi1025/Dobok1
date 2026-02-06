// app/mypage/orders/[orderNumber]/page.tsx
import OrderDetailClientPage from "./page.client";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: { orderNumber: string };
}

export default async function OrderDetailPage({ params }: Props) {
  const order = await prisma.order.findUnique({
    where: { orderNumber: params.orderNumber },
    include: {
      items: true,
      user: true, // 여기서 배송정보 가져오기
    },
  });

  if (!order) notFound();

  const formattedOrder = {
    ...order,
    date: order.createdAt.toISOString().slice(0, 10),
    shipping: {
      name: order.user.name,
      phone: order.user.phone,
      address: order.user.address,
    },
  };

  return <OrderDetailClientPage order={formattedOrder} />;
}
