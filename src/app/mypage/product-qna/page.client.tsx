"use client";
import Link from "next/link";
import { Column, Table } from "@/components/Table/page";
import styles from "./page.module.scss";
import { useState } from "react";
import StatusTab from "@/components/mypage/StatusTabs";
import Image from "next/image";

export interface Qna {
  id: number;
  productName: string;
  img: string;
  qnaTitle: string;
  qnaAt: string;
  qnaStatus: "답변대기" | "답변완료";
}

const QnaColumns: Column<Qna>[] = [
  {
    key: "productName",
    label: <span style={{ flex: 1 }}>상품명/옵션</span>,
    flex: 4,
    render: (row) => (
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          gap: "25px",
          paddingLeft: "50px",
        }}
      >
        <Image alt={row.productName} src={row.img} width={90} height={90} />

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

interface Props {
  qnas: Qna[];
}

export default function ProductQnaClientPage({ qnas }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState<
    "전체" | "답변대기" | "답변완료"
  >("전체");
  const itemsPerPage = 10;

  const pageCount = Math.ceil(qnas.length / itemsPerPage);

  const currentItems = qnas.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <div className={styles.inner}>
      <header>
        <h1>상품 문의</h1>

        {/* 상태 선택 탭 */}
        <StatusTab
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          setCurrentPage={setCurrentPage}
        />
      </header>

      {/* 테이블 목록 */}
      <Table columns={QnaColumns} data={currentItems} />
    </div>
  );
}
