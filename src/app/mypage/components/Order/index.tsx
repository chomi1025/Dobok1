"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as M from "../style";
import * as O from "./style";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";
import PeriodTabsComponent from "../../../../components/mypage/PeriodTabs";
import {
  Column,
  OrdersTable,
} from "@/components/mypage/ordersTable/ordersTable";
import OrderSkeleton from "./OrderSkeleton";

export type OrderStatus =
  | "PAYMENT_COMPLETE" // 결제완료
  | "PREPARING" // 상품준비중
  | "SHIPPING" // 배송중
  | "DELIVERED"; // 배송완료

const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  PAYMENT_COMPLETE: "결제완료",
  PREPARING: "상품준비중",
  SHIPPING: "배송중",
  DELIVERED: "배송완료",
};

const STATUS_ACTIONS: Record<OrderStatus, React.ReactNode> = {
  PAYMENT_COMPLETE: <O.SecondaryButton>주문취소</O.SecondaryButton>,
  PREPARING: null,
  SHIPPING: <O.SecondaryButton>배송조회</O.SecondaryButton>,
  DELIVERED: (
    <>
      <O.PrimaryButton>리뷰작성</O.PrimaryButton>
      <O.SecondaryButton>반품신청</O.SecondaryButton>
    </>
  ),
};

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
}

const orderColumns: Column<Order>[] = [
  {
    key: "date",
    label: "날짜/주문번호",
    flex: 1.4,
    render: (row) => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{row.date}</span>

        <Link href="/">
          <span style={{ textDecoration: "underline" }}>{row.orderNumber}</span>
        </Link>
      </div>
    ),
  },
  {
    key: "name",
    label: "상품명/옵션",
    flex: 3,
    align: "left",
    render: (row) => (
      <div style={{ display: "flex", alignItems: "center", gap: "23px" }}>
        <Link href="/">
          <img src={row.img} width={90} height={90} />
        </Link>

        <Link href="/">
          <span>{row.name}</span>
        </Link>
      </div>
    ),
  },
  {
    key: "price",
    label: "상품금액/수량",
    flex: 1,
    render: (row) => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{row.price.toLocaleString()}원</span>
        <span>{row.quantity}개</span>
      </div>
    ),
  },
  {
    key: "total",
    label: "합계금액",
    flex: 1,
    render: (row) => <strong>{row.total.toLocaleString()}원</strong>,
  },
  {
    key: "status",
    label: "상태 / 처리",
    flex: 1,
    render: (row) => (
      <O.StatusActions>
        <span>{ORDER_STATUS_LABEL[row.status]}</span>
        {STATUS_ACTIONS[row.status]}
      </O.StatusActions>
    ),
  },
];

// 서버에서 주문 데이터를 fetch하는 함수
async function fetchOrders() {
  const res = await fetch("/api/mypage/orders");
  return res.json();
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // 서버 데이터 fetch
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const currentItems = orders.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  // 페이지 변경 핸들러
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <M.Contents>
      <h2>주문/배송 조회</h2>

      {/* 날짜 선택 탭 */}
      <PeriodTabsComponent />

      {/* 테이블 목록 */}
      <OrdersTable
        columns={orderColumns}
        inquiry={false}
        data={loading ? [] : currentItems}
      />

      {loading && <OrderSkeleton />}

      {/* 페이지네이션 */}
      <O.Pagination>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </O.Pagination>
    </M.Contents>
  );
}
