"use client";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { Column, table } from "@/components/Table/page";
import * as M from "../style";
import { useEffect, useState } from "react";
import PeriodTabsComponent from "@/components/mypage/PeriodTabs";

type ClaimType = "cancel" | "exchange" | "return";

type PeriodType = "1MONTH" | "3MONTH" | "6MONTH" | "12MONTH" | "CUSTOM";

type FixedPeriod = Exclude<PeriodType, "CUSTOM">;

export interface Claim {
  id: number;
  type: ClaimType;
  requestedAt: string;
  claimNumber: string;
  name: string;
  img: string;
  price: string;
  quantity: number;
  total: string;
}

const CLAIM_TYPE_LABEL = {
  cancel: "취소",
  exchange: "교환",
  return: "반품",
} as const;

const claimColumns: Column<Claim>[] = [
  {
    key: "type",
    label: "유형",
    flex: 1,
    render: (row) => <span>{CLAIM_TYPE_LABEL[row.type]}</span>,
  },
  {
    key: "requestedAt",
    label: "신청일",
    flex: 1.2,
  },
  {
    key: "claimNumber",
    label: "접수번호",
    flex: 1.6,
    render: (row) => (
      <Link href={`/mypage/claim/${row.claimNumber}`}>{row.claimNumber}</Link>
    ),
  },
  {
    key: "name",
    label: "상품명/옵션",
    flex: 3,
    align: "left",
    render: (row) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "23px",
          textDecoration: "underline",
        }}
      >
        <img src={row.img} width={90} height={90} />
        <span
          style={{
            display: "flex",
            justifyContent: "left",
            textAlign: "left",
            paddingRight: "10px",
          }}
        >
          {row.name}
        </span>
      </div>
    ),
  },
  {
    key: "price",
    label: "상품금액/수량",
    flex: 1.4,
    render: (row) => (
      <span>
        {row.price.toLocaleString()}원 / {row.quantity}개
      </span>
    ),
  },
  {
    key: "total",
    label: "합계금액",
    flex: 1.2,
    render: (row) => (
      <span>
        {row.price.toLocaleString()}원 / {row.quantity}개
      </span>
    ),
  },
];

export default function ClaimsPage() {
  // 날짜관련
  const [period, setPeriod] = useState<PeriodType>("1MONTH"); //기본탭 : 1개월
  const [customRange, setCustomRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null); //커스텀 탭
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0); // react-paginate는 0부터 시작
  const itemsPerPage = 10;

  const pageCount = Math.ceil(claims.length / itemsPerPage);

  const currentItems = claims.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  // 페이지 변경 핸들러
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  useEffect(() => {
    const fetchClaims = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/mypage/claim", {
          credentials: "include",
        });

        const data: Claim[] = await res.json();
        setClaims(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  return (
    <M.Contents>
      <h2>취소/교환/반품 조회</h2>

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
      <table columns={claimColumns} data={currentItems} />

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
