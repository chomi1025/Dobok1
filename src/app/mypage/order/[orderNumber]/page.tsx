import OrderDetailClientPage from "./page.client";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { redirect, notFound } from "next/navigation";

interface Props {
  params: { orderNumber: string };
}

interface Items {
  id: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  productImage: string;
}
export default async function OrderDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  // 로그인 체크
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = Number(session.user.id);

  // 본인 주문만
  const order = await prisma.order.findFirst({
    where: {
      orderNumber: params.orderNumber,
      userId: userId,
    },
    include: {
      items: true,
      user: {
        select: {
          name: true,
          phone: true,
          address: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  const formattedOrder = {
    id: order.id,
    orderNumber: order.orderNumber,
    date: order.createdAt.toISOString().split("T")[0],
    status: order.status,
    items: order.items.map((item: any) => {
      const originalPrice = item.originPrice;
      const salePrice = item.salePrice ?? item.totalPrice / item.quantity;

      const discountRate =
        originalPrice && salePrice && originalPrice > salePrice
          ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
          : 0;

      return {
        id: item.id,
        productName: item.productName,
        quantity: item.quantity,
        productImage: item.productImage,

        originalPrice,
        salePrice,
        discountRate,
        totalPrice: item.totalPrice,
      };
    }),

    shipping: {
      name: order.user.name,
      phone: order.user.phone,
      address: order.user.address,
    },
  };

  return <OrderDetailClientPage order={formattedOrder} />;
}
