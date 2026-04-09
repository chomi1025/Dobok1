"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Column, Table } from "@/components/Table/page";
import PeriodTabsComponent from "@/components/mypage/PeriodTabs";
import styles from "./page.module.scss";

export type OrderStatus =
  | "PAYMENT_COMPLETE"
  | "PREPARING"
  | "SHIPPING"
  | "DELIVERED";

type PeriodType = "1MONTH" | "3MONTH" | "6MONTH" | "12MONTH" | "CUSTOM";

export interface Order {
  id: number;
  date: string;
  orderNumber: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  status: OrderStatus;
  claims?: {
    id: number;
    claimType: "RETURN" | "EXCHANGE";
    status: string;
  }[];
  reviewWritten?: boolean;
}

const mockOrders: Order[] = [
  {
    id: 1,
    date: "2026-03-16",
    orderNumber: "ORD-20260316-001",
    img: "https://via.placeholder.com/60",
    name: "프리미엄 선수용 도복 - 화이트",
    price: 125000,
    quantity: 1,
    total: 125000,
    status: "DELIVERED",
    reviewWritten: false,
  },
  {
    id: 2,
    date: "2026-03-15",
    orderNumber: "ORD-20260315-042",
    img: "https://via.placeholder.com/60",
    name: "컴팩트 훈련용 도복 - 블루",
    price: 89000,
    quantity: 2,
    total: 178000,
    status: "SHIPPING",
  },
  {
    id: 3,
    date: "2026-03-10",
    orderNumber: "ORD-20260310-015",
    img: "https://via.placeholder.com/60",
    name: "고급 면 띠 - 블랙",
    price: 25000,
    quantity: 1,
    total: 25000,
    status: "DELIVERED",
    reviewWritten: true,
  },
  {
    id: 4,
    date: "2026-03-05",
    orderNumber: "ORD-20260305-088",
    img: "https://via.placeholder.com/60",
    name: "경량 스파링 보호구 세트",
    price: 45000,
    quantity: 1,
    total: 45000,
    status: "PREPARING",
  },
  {
    id: 5,
    date: "2026-02-28",
    orderNumber: "ORD-20260228-011",
    img: "https://via.placeholder.com/60",
    name: "도복 전용 가방 - 라지",
    price: 35000,
    quantity: 1,
    total: 35000,
    status: "PAYMENT_COMPLETE",
  },
  {
    id: 6,
    date: "2026-02-20",
    orderNumber: "ORD-20260220-099",
    img: "https://via.placeholder.com/60",
    name: "입문자용 도복 - 네이비",
    price: 65000,
    quantity: 1,
    total: 65000,
    status: "DELIVERED",
    reviewWritten: false,
    claims: [{ id: 101, claimType: "EXCHANGE", status: "REQUESTED" }], // 교환 신청 테스트용
  },
  {
    id: 7,
    date: "2026-02-15",
    orderNumber: "ORD-20260215-023",
    img: "https://via.placeholder.com/60",
    name: "운동용 기능성 티셔츠",
    price: 19000,
    quantity: 3,
    total: 57000,
    status: "DELIVERED",
    reviewWritten: true,
  },
  {
    id: 8,
    date: "2026-02-10",
    orderNumber: "ORD-20260210-055",
    img: "https://via.placeholder.com/60",
    name: "패딩 도복 코트",
    price: 158000,
    quantity: 1,
    total: 158000,
    status: "DELIVERED",
    reviewWritten: false,
  },
  {
    id: 9,
    date: "2026-01-25",
    orderNumber: "ORD-20260125-077",
    img: "https://via.placeholder.com/60",
    name: "무릎 보호대 - M",
    price: 12000,
    quantity: 2,
    total: 24000,
    status: "DELIVERED",
    reviewWritten: false,
  },
  {
    id: 10,
    date: "2026-01-05",
    orderNumber: "ORD-20260105-012",
    img: "https://via.placeholder.com/60",
    name: "프로용 글러브 12oz",
    price: 88000,
    quantity: 1,
    total: 88000,
    status: "DELIVERED",
    reviewWritten: true,
  },
];

export default function OrdersClientPage() {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<PeriodType>("1MONTH");
  const [customRange, setCustomRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          setAllOrders(mockOrders);
          setLoading(false);
        }, 500);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const Columns: Column<Order>[] = [
    {
      key: "inquiryType",
      label: "날짜/주문번호",
      flex: 1.5,
      render: (row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            fontSize: "14px",
            color: "#555",
          }}
        >
          <p>{row.date}</p>
          <p>{row.orderNumber}</p>
        </div>
      ),
    },
    {
      key: "name",
      label: "상품명/옵션",
      flex: 4,
      render: (row) => (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flex: "1",
            alignItems: "center",
            paddingLeft: "20px",
          }}
        >
          <img src={row.img} width={90} height={90} />

          <Link
            style={{
              color: "#555",
              fontSize: "14px",
              textDecoration: "none",
            }}
            href={""}
          >
            {row.name}
          </Link>
        </div>
      ),
    },

    {
      key: "priceAndQuantity",
      label: "상품금액/수량",
      flex: 1.3,
      render: (row) => (
        <span
          style={{
            fontSize: "14px",
            color: "#555",
          }}
        >
          {row.quantity}
        </span>
      ),
    },

    {
      key: "total",
      label: "합계금액",
      flex: 1.3,
      render: (row) => (
        <span
          style={{
            fontSize: "14px",
            color: "#555",
          }}
        >
          {row.total.toLocaleString()}원
        </span>
      ),
    },
  ];

  return (
    <div className={styles.inner}>
      <header>
        <h1>주문/배송 조회</h1>

        {/* 날짜 선택 탭 */}
        <PeriodTabsComponent
          period={period}
          onPeriodChange={(p) => {
            setPeriod(p);
            setCustomRange(null);
          }}
          onCustomSubmit={(start, end) => {
            setPeriod("CUSTOM");
            setCustomRange({ start, end });
          }}
        />
      </header>

      <Table columns={Columns} data={mockOrders} />
    </div>
  );
}
