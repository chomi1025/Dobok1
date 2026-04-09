"use client";
import Link from "next/link";
import { Column, Table } from "@/components/Table/page";
import styles from "./page.module.scss";
import { useState } from "react";
import StatusTab from "@/components/mypage/StatusTabs";

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
  inquiryAt: string;
  inquiryStatus: "답변대기" | "답변완료";
}

interface Props {
  inquiries: Inquiry[];
}

export default function InquiryClientPage({ inquiries }: Props) {
  const [statusFilter, setStatusFilter] = useState<
    "전체" | "답변대기" | "답변완료"
  >("전체");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const pageCount = Math.ceil(inquiries.length / itemsPerPage);

  const currentItems = inquiries.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const InquiryColumns: Column<Inquiry>[] = [
    {
      key: "inquiryType",
      label: "문의유형",
      flex: 1.5,
      render: (row) => (
        <div
          style={{
            flex: 1,
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
            flex: 1,
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
            prefetch={false}
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
        <span style={{ flex: 1, fontSize: "14px", color: "#555" }}>
          {row.inquiryAt}
        </span>
      ),
    },

    {
      key: "inquiryStatus",
      label: "상태",
      flex: 1.3,
      render: (row) => (
        <span style={{ flex: 1, fontSize: "14px", color: "#555" }}>
          {row.inquiryStatus}
        </span>
      ),
    },
  ];

  return (
    <div className={styles.inner}>
      <header>
        <h1>1:1문의</h1>

        {/* 상태 선택 탭 */}
        <StatusTab
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          setCurrentPage={setCurrentPage}
        />
      </header>

      {/* 테이블 목록 */}
      <Table columns={InquiryColumns} data={currentItems} />
    </div>
  );
}
