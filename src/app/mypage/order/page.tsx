"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as M from "../style";
import "react-datepicker/dist/react-datepicker.css";
import { Table, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import OrderSkeleton from "./OrderSkeleton";
import PeriodTabsComponent from "@/components/mypage/PeriodTabs";
import styled from "@emotion/styled";

export type OrderStatus =
  | "PAYMENT_COMPLETE"
  | "PREPARING"
  | "SHIPPING"
  | "DELIVERED";

type PeriodType = "1MONTH" | "3MONTH" | "6MONTH" | "12MONTH" | "CUSTOM";

const StyledAntTable = styled(Table)`
  margin-top: 25px !important;
  width: 100%;

  .ant-table-thead > tr > th {
    background-color: #ffffff !important;
    border-top: 1px solid #111 !important;
    border-bottom: 1px solid #dddddd !important;
    color: #111 !important;
    font-weight: 700 !important;
    text-align: center !important;
    padding: 10px !important;
  }

  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #f0f0f0 !important;
    padding: 24px 16px !important;
    color: #333;
    text-align: center;
  }

  .ant-table-tbody > tr:hover > td {
    background-color: #fafafa !important;
  }

  .ant-table-tbody > tr:last-child > td {
    border-bottom: 1px solid #111 !important;
  }

  .ant-pagination {
    margin-top: 40px !important;
    justify-content: center !important;
    display: flex !important;
  }

  .ant-pagination-item-active {
    border-color: #111 !important;
    background-color: #111 !important;
    a {
      color: #fff !important;
    }
  }
`;

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

export default function OrdersPage() {
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

  const columns: ColumnsType<Order> = [
    {
      title: "날짜/주문번호",
      key: "orderNumber",
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <span>{record.date}</span>
          <Link
            href={`/mypage/orders/${record.orderNumber}`}
            style={{ textDecoration: "underline", color: "#1677ff" }}
          >
            {record.orderNumber}
          </Link>
        </Space>
      ),
    },
    {
      title: "상품명/옵션",
      key: "name",
      width: 400,
      align: "left",
      render: (_, record) => (
        <Space size={16}>
          <img
            src={record.img}
            alt={record.name}
            width={60}
            height={60}
            style={{ borderRadius: 4 }}
          />
          <span>{record.name}</span>
        </Space>
      ),
    },
    {
      title: "상품금액/수량",
      key: "priceAndQuantity",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>{record.price.toLocaleString()}원</span>
          <span style={{ color: "#8c8c8c", fontSize: "12px" }}>
            {record.quantity}개
          </span>
        </div>
      ),
    },
    {
      title: "합계금액",
      key: "total",
      render: (t) => <strong>{t.toLocaleString()}원</strong>,
    },
  ];

  return (
    <M.Contents>
      <h2>주문/배송 조회</h2>

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

      {/* 테이블 목록 */}
      {loading && <OrderSkeleton />}
    </M.Contents>
  );
}
