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

export interface Qna {
  id: number;
  content: string;
  createdAt: string;
  reply: string | null;

  product: {
    name: string;
    thumbnail: string;
  };
}

const columnHelper = createColumnHelper<Qna>();

interface Props {
  qnas: Qna[];
}

export default function ProductQnaClientPage({ qnas }: Props) {
  const [statusFilter, setStatusFilter] = useState<
    "전체" | "답변대기" | "답변완료"
  >("전체");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredQnas = useMemo(() => {
    if (statusFilter === "전체") return qnas;

    return qnas.filter((q) =>
      statusFilter === "답변완료" ? !!q.reply : !q.reply,
    );
  }, [qnas, statusFilter]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredQnas.slice(start, start + itemsPerPage);
  }, [filteredQnas, currentPage]);

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "product",
        header: "상품명/문의내용",
        meta: { flex: 5 },
        cell: (info) => (
          <div className={styles.titleColumn}>
            <div className={styles.qnaProductBox}>
              <div className={styles.productThumb}>
                <Image
                  src={
                    info.row.original.product.thumbnail ||
                    "/images/no-image.png"
                  }
                  width={90}
                  height={90}
                  alt="상품"
                />
              </div>

              <div className={styles.qnaTextContent}>
                <strong className={styles.prodName}>
                  {info.row.original.product.name}
                </strong>

                <Link
                  href={`/mypage/product-qna/${info.row.original.id}`}
                  className={styles.qnaTitle}
                  prefetch={false}
                >
                  {info.row.original.content}
                </Link>
              </div>
            </div>
          </div>
        ),
      }),

      columnHelper.display({
        id: "status",
        header: "상태",
        meta: { flex: 1.5 },
        cell: (info) => (
          <Link
            href={`/mypage/qna/${info.row.original.id}`}
            className={styles.qnaTitle}
            prefetch={false}
          >
            <span
              className={
                info.row.original.reply ? styles.statusDone : styles.statusWait
              }
            >
              {info.row.original.reply ? "답변완료" : "답변대기"}
            </span>
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
