import ClaimNewClientPage from "./page.client";

interface Props {
  searchParams: { orderNumber: string };
}

interface Address {
  postcode: string;
  address: string;
  detailAddress: string;
}

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  totalPrice: number;
}

interface FormattedOrder {
  id: number;
  orderNumber: string;
  date: string;
  status: string;
  items: OrderItem[];
  shipping: {
    name: string;
    phone: string;
    address: Address;
  };
}

const mockOrderDetail: FormattedOrder = {
  id: 1,
  orderNumber: "ORD-20260316-001",
  date: "2026-03-16",
  status: "DELIVERED",
  items: [
    {
      id: 101,
      productName: "프리미엄 선수용 도복 - 화이트",
      quantity: 1,
      totalPrice: 125000,
    },
    {
      id: 102,
      productName: "고급 면 띠 - 블랙",
      quantity: 1,
      totalPrice: 25000,
    },
  ],
  shipping: {
    name: "초미",
    phone: "010-1234-5678",
    address: {
      postcode: "02143",
      address: "서울 중랑구 망우동",
      detailAddress: "101동 202호",
    },
  },
};

export default async function ClaimNewPage({ searchParams }: Props) {
  const { orderNumber } = searchParams;

  console.log(orderNumber);

  if (!orderNumber) {
    throw new Error("orderId가 필요합니다");
  }

  return <ClaimNewClientPage order={mockOrderDetail} />;
}
