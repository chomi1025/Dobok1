"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.scss";
import PeriodTabsComponent from "@/components/mypage/PeriodTabs";
import PagenationComponent from "@/components/pagenation/page";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { UnifiedTable } from "@/components/common/DataTable";

type PeriodType = "1MONTH" | "3MONTH" | "6MONTH" | "12MONTH" | "CUSTOM";

export interface Review {
  id: number;
  productId: number;
  productName: string;
  img: string | null;
  optionTexts: (string | null)[];
  deliveredAt: string;
  reviewCreatedAt?: string;
  reviewStatus: "리뷰작성가능" | "리뷰작성완료";
  reviewId?: number;
}

interface Props {
  initialReviews: Review[];
}

export default function ReviewClientPage({ initialReviews }: Props) {
  const [reviews] = useState<Review[]>(initialReviews);
  const [period, setPeriod] = useState<PeriodType>("1MONTH");

  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 10;

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return reviews.slice(start, start + itemsPerPage);
  }, [reviews, currentPage]);

  const columnHelper = createColumnHelper<Review>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("productName", {
        header: "상품명/옵션",
        meta: { flex: 5 },
        cell: (info) => {
          const row = info.row.original;

          return (
            <div className={styles.groupCard}>
              <div className={styles.optionGroup}>
                {row.optionTexts.map((opt, idx) => (
                  <div key={idx} className={styles.optionCard}>
                    <Image
                      src={row.img || "/images/no-image.png"}
                      width={50}
                      height={50}
                      alt="상품"
                    />

                    <div className={styles.optionInfo}>
                      <p className={styles.optionName}>{row.productName}</p>
                      <p className={styles.optionText}>{opt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        },
      }),

      columnHelper.accessor("deliveredAt", {
        header: "배송완료일",
        meta: { flex: 2 },
        cell: (info) => (
          <span className={styles.normalNumber}>{info.getValue()}</span>
        ),
      }),

      columnHelper.accessor("reviewCreatedAt", {
        header: "리뷰작성일",
        meta: { flex: 2 },
        cell: (info) => (
          <span className={styles.normalNumber}>{info.getValue() ?? "-"}</span>
        ),
      }),
      columnHelper.accessor("reviewStatus", {
        header: "상태/관리",
        meta: { flex: 2 },
        cell: (info) => {
          const isDone = info.getValue() === "리뷰작성완료";

          return (
            <div className={styles.actionCell}>
              <span className={isDone ? styles.statusDone : styles.statusWait}>
                {info.getValue()}
              </span>

              <Link
                href={
                  isDone
                    ? `/mypage/review/${info.row.original.reviewId}`
                    : `/mypage/review/new?id=${info.row.original.id}`
                }
                className={isDone ? styles.btnEdit : styles.btnWrite}
              >
                {isDone ? "리뷰보기" : "리뷰작성"}
              </Link>
            </div>
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
        <h1>상품 후기</h1>

        <PeriodTabsComponent
          period={period}
          onPeriodChange={(p) => setPeriod(p)}
          onCustomSubmit={() => setPeriod("CUSTOM")}
        />
      </header>

      <UnifiedTable table={table} className={styles.reviewTable} />

      <div className={styles.paginationSection}>
        <PagenationComponent
          total={reviews.length}
          pageSize={itemsPerPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
