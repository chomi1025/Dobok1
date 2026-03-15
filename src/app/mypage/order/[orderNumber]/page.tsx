import OrderDetailClientPage from "./page.client";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Prisma } from "@prisma/client";

type OrderWithDetails = Prisma.OrderGetPayload<{
  include: {
    items: true;
    user: true;
  };
}>;

interface Props {
  params: Promise<{ orderNumber: string }>;
}

type Address = {
  postcode: string;
  address: string;
  detailAddress: string;
};

interface FormattedOrder {
  id: number;
  orderNumber: string;
  date: string;
  status: string;
  items: {
    id: number;
    productName: string;
    quantity: number;
    totalPrice: number;
  }[];
  shipping: {
    name: string;
    phone: string;
    address: Address;
  };
}

export default async function OrderDetailPage({ params }: Props) {
  const { orderNumber } = await params;

  const order = (await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: true,
      user: true,
    },
  })) as OrderWithDetails | null;

  if (!order) notFound();

  const userAddress = order.user.address as {
    postcode: string;
    address: string;
    detailAddress: string;
  };

  const formattedOrder: FormattedOrder = {
    id: order.id,
    orderNumber: order.orderNumber,
    date: order.createdAt.toISOString().slice(0, 10),
    status: order.status,
    items: order.items.map((item) => ({
      id: item.id,
      productName: item.productName,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
    })),
    shipping: {
      name: order.user.name,
      phone: order.user.phone || "",
      address: userAddress,
    },
  };

  return <OrderDetailClientPage order={formattedOrder} />;
}
