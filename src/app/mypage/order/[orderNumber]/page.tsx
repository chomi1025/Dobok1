import OrderDetailClientPage from "./page.client";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Order as PrismaOrder, User as PrismaUser } from "@prisma/client";

// Props 인터페이스 정의
interface Props {
  params: { orderNumber: string };
}

type Address = {
  postcode: string;
  address: string;
  detailAddress: string;
};

// FormattedOrder 인터페이스 정의
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
  const order = await prisma.order.findUnique({
    where: { orderNumber: params.orderNumber },
    include: {
      items: true,
      user: true, // 사용자 정보 포함
    },
  });

  if (!order) notFound();

  // Prisma의 address 필드가 Json으로 되어 있을 경우, 이를 파싱해서 적절히 다루기
  const userAddress = order.user.address as {
    postcode: string;
    address: string;
    detailAddress: string;
  };

  // 주문 데이터 형식화
  const formattedOrder: FormattedOrder = {
    id: order.id,
    orderNumber: order.orderNumber,
    date: order.createdAt.toISOString().slice(0, 10), // 날짜 형식화
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
