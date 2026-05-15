"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { useMemo, useState } from "react";
import StatusTab from "@/components/mypage/StatusTabs";
import Image from "next/image";
import { UnifiedTable } from "@/components/common/DataTable";
import PagenationComponent from "@/components/pagenation/page";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";

export interface Qna {
  id: number;
  productName: string;
  img: string;
  qnaTitle: string;
  qnaAt: string;
  qnaStatus: "답변대기" | "답변완료";
}

const columnHelper = createColumnHelper<Qna>();

interface Props {
  qnas: Qna[];
}

export default function ProductQnaClientPage({ qnas }: Props) {
  const [statusFilter, setStatusFilter] = useState<
    "전체" | "답변대기" | "답변완료"
  >("전체");
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredQnas = useMemo(() => {
    if (statusFilter === "전체") return qnas;
    return qnas.filter((q) => q.qnaStatus === statusFilter);
  }, [qnas, statusFilter]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredQnas.slice(start, start + itemsPerPage);
  }, [filteredQnas, currentPage]);

const columns = useMemo(
  () => [
    columnHelper.accessor("productName", {
      header: "상품명/문의제목",
      meta: { flex: 5 },
      cell: (info) => (
        <div className={styles.titleColumn}>
          <div className={styles.qnaProductBox}>
            <div className={styles.productThumb}>
              <Image
                src={info.row.original.img || "/images/no-image.png"}
                width={90}
                height={90}
                alt="상품"
              />
            </div>

            <div className={styles.qnaTextContent}>
              <strong className={styles.prodName}>
                {info.getValue()}
              </strong>

              <Link
                href={`/mypage/qna/${info.row.original.id}`}
                className={styles.qnaTitle}
                prefetch={false}
              >
                {info.row.original.qnaTitle}
              </Link>
            </div>
          </div>
        </div>
      ),
    }),

    columnHelper.accessor("qnaStatus", {
      header: "상태",
      meta: { flex: 1.5 },
      cell: (info) => {
        const isDone =
          info.getValue() === "답변완료";

        return (
          <Link
            href={`/mypage/qna/${info.row.original.id}`}
            className={styles.qnaTitle}
            prefetch={false}
          >
            <span
              className={
                isDone
                  ? styles.statusDone
                  : styles.statusWait
              }
            >
              {info.getValue()}
            </span>
          </Link>
        );
      },
    }),

    columnHelper.accessor("qnaAt", {
      header: "작성일",
      meta: { flex: 1.5 },
      cell: (info) => (
        <span className={styles.dateText}>
          {info.getValue()}
        </span>
      ),
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
      <header>
        <h1>상품 문의</h1>

        {/* 상태 선택 탭 */}
        <StatusTab
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          setCurrentPage={setCurrentPage}
        />
      </header>

      <UnifiedTable table={table} className={styles.qnaTable} />

      <div className={styles.paginationSection}>
        <PagenationComponent
          total={filteredQnas.length}
          pageSize={itemsPerPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
