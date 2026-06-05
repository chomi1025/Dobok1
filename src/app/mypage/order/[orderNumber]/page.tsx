import OrderDetailClientPage from "./page.client";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { redirect, notFound } from "next/navigation";
import { OrderItem, Review } from "@prisma/client";

type GroupedItem = {
  productId: number;
  productName: string;
  productImage: string | null;
  hasAnyReview: boolean;
  reviewId: number | null;
  options: {
    orderItemId: number;
    optionText: string | null;
    price: number;
    hasReview: boolean;
    reviewId: number | null;
    quantity: number ;
  }[];
};

type FormattedOrder = {
  id: number;
  orderNumber: string;
  date: string;
  status: string;
  carrier: string | null;
  trackingNumber: string | null;
  items: GroupedItem[];
  shipping: {
    name: string;
    phone: string;
    address: any;
  };
};

type OrderItemWithReview = OrderItem & {
  reviews: Review[];
};

interface Props {
  params: { orderNumber: string };
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
      userId,
    },
    include: {
      items: {
        include: {
          reviews: true,
        },
      },
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

  const groupedMap = order.items.reduce(
    (acc: Record<number, GroupedItem>, item: OrderItemWithReview) => {
      const key = item.productId;

      const reviews = item.reviews ?? [];

      if (!acc[key]) {
        acc[key] = {
          productId: item.productId,
          productName: item.productName,
          productImage: item.productImage,
          hasAnyReview: false,
          reviewId: null,
          options: [],
        };
      }

      if (reviews.length > 0) {
        acc[key].hasAnyReview = true;
        acc[key].reviewId = reviews[0].id;
      }

      acc[key].options.push({
        orderItemId: item.id,
        optionText: item.optionText,
        price: item.totalPrice,
        quantity: item.quantity ?? 0,
        hasReview: reviews.length > 0,
        reviewId: reviews[0]?.id ?? null,
      });

      return acc;
    },
    {} as Record<number, GroupedItem>,
  );

  const grouped: GroupedItem[] = Object.values(groupedMap);

  const formattedOrder: FormattedOrder = {
    id: order.id,
    orderNumber: order.orderNumber,
    date: order.createdAt.toISOString().split("T")[0],
    status: order.status,
    carrier: order.carrier,
    trackingNumber: order.trackingNumber,
    items: grouped,
    shipping: {
      name: order.user.name,
      phone: order.user.phone,
      address: order.user.address,
    },
  };
  return <OrderDetailClientPage order={formattedOrder} />;
}
