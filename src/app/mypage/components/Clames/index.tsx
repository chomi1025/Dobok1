"use client";
import Link from "next/link";
import {
  Column,
  OrdersTable,
} from "@/components/mypage/ordersTable/ordersTable";
import * as M from "../style";
import PeriodTabsComponent from "../../../../components/mypage/PeriodTabs";
import { useState } from "react";

export interface Claim {
  id: number;
  type: "취소" | "교환" | "반품";
  requestedAt: string;
  claimNumber: string;
  name: string;
  img: string;
  price: string;
  quantity: number;
  total: string;
}

const claims: Claim[] = Array.from({ length: 5 }, (_, i) => ({
  id: 2000 + i,
  type: "반품",
  requestedAt: "2025.12.15",
  claimNumber: "C00000946" + 5 + i,
  name: `아디다스 품새도복(여) 유단자용 외  ${i + 1}건`,
  img: "/sample.png",
  price: "57,600원 / 3개",
  quantity: 1,
  total: "57,600원",
}));

const claimColumns: Column<Claim>[] = [
  {
    key: "type",
    label: "유형",
    flex: 1,
    render: (row) => <span>{row.type}</span>,
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
      <span style={{ textDecoration: "underline" }}>
        <Link href={""}>{row.claimNumber}</Link>
      </span>
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
  },
  {
    key: "total",
    label: "합계금액",
    flex: 1.2,
  },
];

export default function ClaimsPage() {
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

  return (
    <M.Contents>
      <h2>취소/교환/반품 조회</h2>

      {/* 날짜 선택 탭 */}
      <PeriodTabsComponent />

      {/* 테이블 목록 */}
      <OrdersTable columns={claimColumns} data={currentItems} />
    </M.Contents>
  );
}
