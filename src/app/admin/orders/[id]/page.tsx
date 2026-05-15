import { prisma } from "@/lib/prisma";
import AdminOrderDetailClientPage from "./page.client";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "도복일번지 | 관리자 주문 상세",
  description: "도복일번지 주문 관리 페이지",
};

interface Props {
  params: {
    id: string;
  };
}

export default async function AdminOrderDetailPage({ params }: Props) {
  const { id } = params;

  const order = await prisma.order.findUnique({
    where: {
      orderNumber: id,
    },

    include: {
      items: true,
      histories: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!order) {
    return <div>주문을 찾을 수 없습니다.</div>;
  }

  return <AdminOrderDetailClientPage order={order} />;
}
