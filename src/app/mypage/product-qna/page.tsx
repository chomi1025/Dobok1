"use client";
import Link from "next/link";
import { Column, table } from "@/components/Table/page";
import * as P from "../style";
import { useState } from "react";

export interface Qna {
  id: number;
  productName: string;
  img: string;
  qnaTitle: string;
  qnaAt: string; // 배송완료일 (날짜)
  qnaStatus: "답변대기" | "답변완료";
}

const qnas: Qna[] = Array.from({ length: 5 }, (_, i) => ({
  id: 2000 + i,
  productName: `아디다스 품새도복(여) 유단자용 ${i + 1}`,
  qnaTitle: "목부분 소재가 어떻게되나요? 궁금합니다",
  img: "/sample.png",
  qnaAt: "2025.12.15",
  qnaStatus: i % 2 === 0 ? "답변대기" : "답변완료",
}));

const QnaColumns: Column<Qna>[] = [
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
          paddingLeft: "50px",
        }}
      >
        <img src={row.img} width={90} height={90} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            height: "90px",
            padding: "5px 0 10px",
          }}
        >
          <span
            style={{
              fontWeight: "700",
              fontSize: "15px",
            }}
          >
            {row.productName}
          </span>
          <Link href={""}>
            <p
              style={{
                color: "#555",
                fontSize: "14px",
                textDecoration: "underline",
              }}
            >
              {row.qnaTitle}
            </p>
          </Link>
        </div>
      </div>
    ),
  },

  {
    key: "qnaStatus",
    label: "상태",
    flex: 1,
    render: (row) => <span>{row.qnaStatus}</span>,
  },

  {
    key: "qnaAt",
    label: "날짜",
    flex: 1,
    render: (row) => <span>{row.qnaAt}</span>,
  },
];

export default function ProductQna() {
  const [currentPage, setCurrentPage] = useState(0); // react-paginate는 0부터 시작
  const itemsPerPage = 10;

  const pageCount = Math.ceil(qnas.length / itemsPerPage);

  const currentItems = qnas.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  // 페이지 변경 핸들러
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <P.Contents>
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
      <table columns={QnaColumns} data={currentItems} />
    </P.Contents>
  );
}
