"use client";
import Link from "next/link";
import {
  Column,
  OrdersTable,
} from "@/components/mypage/ordersTable/ordersTable";
import * as M from "../style";
import { useState } from "react";
import PeriodTabsComponent from "@/components/mypage/PeriodTabs";

type PeriodType = "1MONTH" | "3MONTH" | "6MONTH" | "12MONTH" | "CUSTOM";

export interface Reviews {
  id: number;
  productName: string;
  img: string;
  deliveredAt: string; // 배송완료일 (날짜)
  reviewStatus: "리뷰작성가능" | "리뷰작성완료";
  reviewId?: number; // 작성완료일 때만 존재
}

const reviews: Reviews[] = Array.from({ length: 5 }, (_, i) => ({
  id: 2000 + i,
  productName: `아디다스 품새도복(여) 유단자용 ${i + 1}`,
  img: "/sample.png",
  deliveredAt: "2025.12.15",
  reviewStatus: i % 2 === 0 ? "리뷰작성가능" : "리뷰작성완료",
  reviewId: i % 2 === 0 ? undefined : 5000 + i,
}));

const reviewColumns: Column<Reviews>[] = [
  {
    key: "productName",
    label: "상품명/옵션",
    flex: 4,
    render: (row) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
          paddingLeft: "30px",
        }}
      >
        <img src={row.img} width={90} height={90} />
        <span>{row.productName}</span>
      </div>
    ),
  },
  {
    key: "deliveredAt",
    label: "배송완료",
    flex: 1,
  },
  {
    key: "reviewStatus",
    label: "상태",
    flex: 1,
    render: (row) => <span>{row.reviewStatus}</span>,
  },
  {
    key: "reviewStatus",
    label: "작업",
    flex: 1,
    render: (row) =>
      row.reviewStatus === "리뷰작성완료" ? (
        <span
          style={{
            color: "#555",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          작성완료
        </span>
      ) : (
        <Link
          href={`/mypage/reviews/write/${row.id}`}
          style={{
            backgroundColor: "#333",
            textDecoration: "none",
            color: "white",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          작성하기
        </Link>
      ),
  },
];

export default function ReviewPage() {
  const [currentPage, setCurrentPage] = useState(0); // react-paginate는 0부터 시작
  const itemsPerPage = 10;
  const [period, setPeriod] = useState<PeriodType>("1MONTH"); //기본탭 : 1개월
  const [customRange, setCustomRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null); //커스텀 탭

  const pageCount = Math.ceil(reviews.length / itemsPerPage);

  const currentItems = reviews.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  // 페이지 변경 핸들러
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <M.Contents>
      <h2>상품 후기</h2>

      {/* 날짜 선택 탭 */}
      <PeriodTabsComponent
        period={period}
        onPeriodChange={(p) => {
          setPeriod(p);
          setCustomRange(null); // 🔥 탭 누르면 커스텀 초기화
        }}
        onCustomSubmit={(start, end) => {
          setPeriod("CUSTOM");
          setCustomRange({ start, end });
        }}
      />

      {/* 테이블 목록 */}
      <OrdersTable columns={reviewColumns} data={currentItems} />
    </M.Contents>
  );
}
