"use client";
import Link from "next/link";
import { Column, table } from "@/components/Table/page";
import * as P from "../style";
import { useState } from "react";

export type InquiryType =
  | "배송문의"
  | "반품/환불"
  | "교환문의"
  | "주문/결제"
  | "상품문의"
  | "회원정보"
  | "기타";

export interface Inquiry {
  id: number;
  inquiryType: InquiryType;
  img: string;
  inquiryTitle: string;
  inquiryAt: string; // 배송완료일 (날짜)
  inquiryStatus: "답변대기" | "답변완료";
}

const inquiries: Inquiry[] = Array.from({ length: 5 }, (_, i) => ({
  id: 2000 + i,
  inquiryType: i % 2 === 0 ? "배송문의" : "반품/환불",
  inquiryTitle: "목부분 소재가 어떻게되나요? 궁금합니다",
  img: "/sample.png",
  inquiryAt: "2025.12.15",
  inquiryStatus: i % 2 === 0 ? "답변대기" : "답변완료",
}));

const InquiryColumns: Column<Inquiry>[] = [
  {
    key: "inquiryType",
    label: "문의유형",
    flex: 1.5,
    render: (row) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "25px",
          fontSize: "14px",
          color: "#555",
        }}
      >
        <p>{row.inquiryType}</p>
      </div>
    ),
  },
  {
    key: "inquiryTitle",
    label: "제목",
    flex: 4,
    render: (row) => (
      <div
        style={{
          display: "flex",
          gap: "20px",
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
          {row.inquiryTitle}
        </Link>
      </div>
    ),
  },

  {
    key: "inquiryAt",
    label: "작성일",
    flex: 1.3,
    render: (row) => (
      <span
        style={{
          fontSize: "14px",
          color: "#555",
        }}
      >
        {row.inquiryAt}
      </span>
    ),
  },

  {
    key: "inquiryStatus",
    label: "상태",
    flex: 1.3,
    render: (row) => (
      <span
        style={{
          fontSize: "14px",
          color: "#555",
        }}
      >
        {row.inquiryStatus}
      </span>
    ),
  },
];

export default function Inquiry() {
  const [currentPage, setCurrentPage] = useState(0); // react-paginate는 0부터 시작
  const itemsPerPage = 10;

  const pageCount = Math.ceil(inquiries.length / itemsPerPage);

  const currentItems = inquiries.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  // 페이지 변경 핸들러
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <P.Contents isEdit={false}>
      <h2>상품 문의</h2>

      {/* 상태 선택 탭 */}
      <div style={{ display: "flex", alignItems: "center", height: "60px" }}>
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "120px",
            height: "60px",
            textAlign: "center",
          }}
        >
          전체
        </button>
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "120px",
            height: "60px",
            textAlign: "center",
          }}
        >
          답변대기
        </button>
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "120px",
            height: "60px",
            textAlign: "center",
          }}
        >
          답변완료
        </button>
      </div>

      {/* 테이블 목록 */}
      <table inquiry columns={InquiryColumns} data={currentItems} />
    </P.Contents>
  );
}
