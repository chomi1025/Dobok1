"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Column, Table } from "@/components/Table/page";
import styles from "./page.module.scss";
import PeriodTabsComponent from "@/components/mypage/PeriodTabs";
import PagenationComponent from "@/components/pagenation/page";
import { Review } from "./page";

type PeriodType = "1MONTH" | "3MONTH" | "6MONTH" | "12MONTH" | "CUSTOM";

const reviewColumns: Column<Review>[] = [
  {
    key: "productName",
    label: "상품명/옵션",
    flex: 4,
    render: (row) => (
      <div
        style={{
            flex:1,
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

interface Props {
  initialReviews: Review[];
}

export default function ReviewClientPage({ initialReviews }: Props) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews || []);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [period, setPeriod] = useState<PeriodType>("1MONTH");
  const [customRange, setCustomRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  const pageCount = Math.ceil(reviews.length / itemsPerPage);
  const currentItems = reviews.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  useEffect(() => {
    /*
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/mypage/review", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("리뷰 목록 가져오기 실패");
        const data: Review[] = await res.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
        setReviews([]);
      }
    };

    fetchReviews();
    */
  }, []);

  return (
    <div className={styles.inner}>
      <header>
        <h1>상품 후기</h1>

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

      {/* 테이블 목록 */}
      <Table columns={reviewColumns} data={currentItems} />

      {/* 페이지네이션 */}
      <PagenationComponent
        total={reviews.length}
        pageSize={itemsPerPage}
        currentPage={currentPage + 1}
      />
    </div>
  );
}
