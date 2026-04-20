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
import Image from "next/image";
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
  inquiryType: InquiryType;
  img: string;
  inquiryTitle: string;
  inquiryAt: string;
  inquiryStatus: "답변대기" | "답변완료";
}

interface Props {
  inquiries: Inquiry[];
}

const columnHelper = createColumnHelper<Inquiry>();

export default function InquiryClientPage({ inquiries }: Props) {
  const [statusFilter, setStatusFilter] = useState<
    "전체" | "답변대기" | "답변완료"
  >("전체");
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 10;

  // 필터링
  const filteredData = useMemo(() => {
    if (statusFilter === "전체") return inquiries;
    return inquiries.filter((item) => item.inquiryStatus === statusFilter);
  }, [inquiries, statusFilter]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("inquiryType", {
        header: "문의유형",
        size: 140,
        cell: (info) => (
          <span className={styles.typeBadge}>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("inquiryTitle", {
        header: "제목",
        size: 478,
        cell: (info) => (
          <div className={styles.titleColumn}>
            <div className={styles.inquiryTextContent}>
              <Link
                href={`/mypage/inquiry/${info.row.original.id}`}
                className={styles.inquiryLink}
                prefetch={false}
              >
                {info.getValue()}
              </Link>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("inquiryAt", {
        header: "작성일",
        size: 150,
        cell: (info) => (
          <span className={styles.dateText}>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("inquiryStatus", {
        header: "상태",
        size: 180,
        cell: (info) => {
          const isDone = info.getValue() === "답변완료";
          return (
            <span className={isDone ? styles.c : styles.statusWait}>
              {info.getValue()}
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
        <div className={styles.titleRow}>
          <h1>1:1 문의</h1>

          <Button variant="black" href="/mypage/inquiry/write">
            문의하기
          </Button>
        </div>

        <StatusTab
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          setCurrentPage={() => {}}
        />
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
