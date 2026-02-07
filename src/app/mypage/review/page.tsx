"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Column,
  OrdersTable,
} from "@/components/mypage/ordersTable/ordersTable";
import * as M from "../style";
import PeriodTabsComponent from "@/components/mypage/PeriodTabs";
import { useSession } from "next-auth/react";
import ReactPaginate from "react-paginate";

type PeriodType = "1MONTH" | "3MONTH" | "6MONTH" | "12MONTH" | "CUSTOM";

export interface Reviews {
  id: number;
  productName: string;
  img: string;
  deliveredAt: string; // 배송완료일
  reviewStatus: "리뷰작성가능" | "리뷰작성완료";
  reviewId?: number;
}

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
          gap: 25,
          paddingLeft: 30,
        }}
      >
        <img src={row.img} width={90} height={90} />
        <span>{row.productName}</span>
      </div>
    ),
  },
  { key: "deliveredAt", label: "배송완료", flex: 1 },
  {
    key: "reviewStatus",
    label: "상태",
    flex: 1,
    render: (row) => <span>{row.reviewStatus}</span>,
  },
  {
    key: "action",
    label: "작업",
    flex: 1,
    render: (row) =>
      row.reviewStatus === "리뷰작성완료" ? (
        <Link
          href={`/mypage/review/${row.reviewId}`}
          style={{
            color: "#555",
            padding: 10,
            border: "1px solid #ddd",
            borderRadius: 5,
            textDecoration: "none",
          }}
        >
          작성완료
        </Link>
      ) : (
        <Link
          href={`/mypage/review/new?id=${row.id}`}
          style={{
            backgroundColor: "#333",
            textDecoration: "none",
            color: "white",
            padding: 10,
            border: "1px solid #ddd",
            borderRadius: 5,
          }}
        >
          작성하기
        </Link>
      ),
  },
];

export default function ReviewPage() {
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [period, setPeriod] = useState<PeriodType>("1MONTH");
  const [customRange, setCustomRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  console.log("reviews:", reviews);
  const pageCount = Math.ceil(reviews.length / itemsPerPage);
  const currentItems = reviews.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  // ✅ fetch + session 체크 + console.log 브라우저 출력
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/mypage/review", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("리뷰 목록 가져오기 실패");
        const data: Reviews[] = await res.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
        setReviews([]);
      }
    };

    fetchReviews();
  }, []);

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
          setCustomRange(null);
        }}
        onCustomSubmit={(start, end) => {
          setPeriod("CUSTOM");
          setCustomRange({ start, end });
        }}
      />

      {/* 테이블 목록 */}
      <OrdersTable columns={reviewColumns} data={currentItems} />

      {/* 페이지네이션 (react-paginate 등) */}
      {/* 페이지네이션 */}
      <M.Pagination>
        <ReactPaginate
          pageCount={pageCount > 0 ? pageCount : 1} // 페이지 없으면 1로
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName={`page-item prev ${currentPage === 0 ? "disabled" : ""}`}
          previousLinkClassName="page-link"
          nextClassName={`page-item next ${currentPage + 1 === pageCount ? "disabled" : ""}`}
          nextLinkClassName="page-link"
          activeClassName="active"
          previousLabel={<img src="/image/active-left.png" alt="이전" />}
          nextLabel={<img src="/image/active-right.png" alt="다음" />}
        />
      </M.Pagination>
    </M.Contents>
  );
}
