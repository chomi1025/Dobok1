"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import { useMemo, useState } from "react";
import StatusTab from "@/components/mypage/StatusTabs";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { UnifiedTable } from "@/components/common/DataTable";
import PagenationComponent from "@/components/pagenation/page";
import Button from "@/components/common/buttons/page";

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
  content: string;
  title: string | null;
  category: "PRODUCT" | "DELIVERY" | "ORDER" | "RETURN" | "OTHER";
  status: "WAITING" | "ANSWERED";
  createdAt: string;
}

const CategoryChange = {
  PRODUCT: "상품문의",
  DELIVERY: "배송문의",
  ORDER: "주문문의",
  RETURN: "취소·반품문의",
  OTHER: "기타문의",
};

interface Props {
  inquiries: Inquiry[];
}

const columnHelper = createColumnHelper<Inquiry>();

export default function InquiryClientPage({ inquiries }: Props) {
  console.log(inquiries);
  const [statusFilter, setStatusFilter] = useState<
    "전체" | "답변대기" | "답변완료"
  >("전체");
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 10;

  // 필터링
  const filteredData = useMemo(() => {
    if (statusFilter === "전체") return inquiries;

    return inquiries.filter((item) =>
      statusFilter === "답변완료"
        ? item.status === "ANSWERED"
        : item.status === "WAITING",
    );
  }, [inquiries, statusFilter]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("category", {
        header: "문의유형",
        meta: { flex: 1.5 },
        cell: (info) => (
          <span className={styles.typeBadge}>
            {CategoryChange[info.getValue()]}
          </span>
        ),
      }),

      columnHelper.display({
        id: "title",
        header: "제목",
        meta: { flex: 5 },
        cell: (info) => (
          <Link
            href={`/mypage/inquiry/${info.row.original.id}`}
            className={styles.inquiryLink}
            prefetch={false}
          >
            {info.row.original.title ?? info.row.original.content.slice(0, 30)}
          </Link>
        ),
      }),

      columnHelper.accessor("createdAt", {
        header: "작성일",
        meta: { flex: 1.5 },
        cell: (info) => (
          <span className={styles.dateText}>
            {new Date(info.getValue()).toLocaleDateString("ko-KR")}
          </span>
        ),
      }),
      columnHelper.accessor("status", {
        header: "상태",
        meta: { flex: 1.5 },
        cell: (info) => {
          const isDone = info.getValue() === "ANSWERED";

          return (
            <span className={isDone ? styles.statusDone : styles.statusWait}>
              {isDone ? "답변완료" : "답변대기"}
            </span>
          );
        },
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.inner}>
      <header className={styles.pageHeader}>
        <h1>1:1 문의</h1>

        <div className={styles.titleRow}>
          <Button variant="black" href="/mypage/inquiry/write">
            문의하기
          </Button>

          <StatusTab
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            setCurrentPage={() => {}}
          />
        </div>
      </header>

      <UnifiedTable table={table} className={styles.inquiryTable} />

      <div className={styles.paginationSection}>
        <PagenationComponent
          total={filteredData.length}
          pageSize={itemsPerPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
