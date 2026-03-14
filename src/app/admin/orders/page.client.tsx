"use client";
import { useState } from "react";
import * as O from "./style";
import { Table } from "@/components/Table/page";
import Link from "next/link";

type Period = "today" | "7days" | "30days" | "customDate";

interface OrderRow {
  id: number;
  orderNumber: string;
  orderDate: string;
  customerName: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  orderStatus: string;
  deliveryStatus: string;
  manage?: string;
}

interface Column<T> {
  key: keyof T | string;
  label: string;
  flex?: number;
  render?: (row: T) => React.ReactNode;
}

const data: OrderRow[] = [
  {
    id: 1,
    orderNumber: "123132",
    orderDate: "2026-02-24",
    customerName: "김순자",
    productName: "아디다스도복 외 2건",
    quantity: 100,
    totalPrice: 131231,
    orderStatus: "주문완료",
    deliveryStatus: "배송전",
  },
];

const OrderColumns: Column<OrderRow>[] = [
  {
    key: "orderNumber",
    label: "주문번호",
    flex: 1.6,
    render: (row) => (
      <Link href={`/admin/orders/${row.orderNumber}`}>
        <span style={{ textDecoration: "underline", fontWeight: 600 }}>
          #{row.orderNumber}
        </span>
      </Link>
    ),
  },
  {
    key: "orderDate",
    label: "주문일",
    flex: 1.2,
    render: (row) => <span>{row.orderDate}</span>,
  },
  {
    key: "customerName",
    label: "고객명",
    flex: 1,
    render: (row) => <span>{row.customerName}</span>,
  },
  {
    key: "productName",
    label: "상품명",
    flex: 2.4,
    render: (row) => (
      <span
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {row.productName}
      </span>
    ),
  },
  {
    key: "orderStatus",
    label: "상태",
    flex: 1,
    render: (row) => <span style={{ fontWeight: 500 }}>{row.orderStatus}</span>,
  },
  {
    key: "manage",
    label: "관리",
    flex: 0.8,
    render: (row) => (
      <Link href={`/admin/orders/${row.orderNumber}`}>상세보기</Link>
    ),
  },
];

export default function OrdersClientPage() {
  const [period, setPeriod] = useState("today");

  const onClickPeriod = (period: Period) => {
    setPeriod(period);
  };

  console.log("선택된날짜:", period);

  return (
    <O.Inner>
      <h2>주문 관리</h2>

      <O.OrderFilter aria-label="주문관리-검색필터">
        <O.FilterPeriod>
          <h4>기간</h4>
          <ul role="listbox">
            <O.List role="option" active={period == "today"}>
              <button type="button" onClick={() => onClickPeriod("today")}>
                오늘
              </button>
            </O.List>
            <O.List role="option" active={period == "7days"}>
              <button type="button" onClick={() => onClickPeriod("7days")}>
                7일
              </button>
            </O.List>
            <O.List role="option" active={period == "30days"}>
              <button type="button" onClick={() => onClickPeriod("30days")}>
                30일
              </button>
            </O.List>
            <O.List role="option" active={period == "customDate"}>
              <button type="button" onClick={() => onClickPeriod("customDate")}>
                <span></span>
                날짜선택
              </button>
            </O.List>
          </ul>
        </O.FilterPeriod>

        <O.FilterGroup>
          <O.FilterOrderStatus>
            <h4>주문상태</h4>
            <select name="" id="">
              <option value="">전체 ▼</option>
            </select>
          </O.FilterOrderStatus>

          <O.FilterDeliveryStatus>
            <h4>배송상태</h4>
            <select name="" id="">
              <option value="">전체 ▼</option>
            </select>
          </O.FilterDeliveryStatus>

          <O.SearchInput>
            <h4>검색</h4>
            <input type="text" placeholder="주문번호 / 고객명 / 상품명 검색" />
          </O.SearchInput>

          <O.FilterActions>
            <button>검색 </button>
            <button>초기화</button>
          </O.FilterActions>
        </O.FilterGroup>
      </O.OrderFilter>

      <Table columns={OrderColumns} data={data} />
    </O.Inner>
  );
}
