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
  productName: string;
  img: string;
  deliveredAt: string;
  reviewStatus: "리뷰작성가능" | "리뷰작성완료";
  reviewId?: number;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 101,
    productName: "프리미엄 선수용 도복 - 화이트",
    img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
    deliveredAt: "2026-04-01",
    reviewStatus: "리뷰작성완료",
    reviewId: 501,
  },
  {
    id: 102,
    productName: "컴팩트 훈련용 도복 - 블루",
    img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
    deliveredAt: "2026-04-03",
    reviewStatus: "리뷰작성가능",
  },
  {
    id: 103,
    productName: "아디다스 품새도복 유단자용",
    img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
    deliveredAt: "2026-03-25",
    reviewStatus: "리뷰작성완료",
    reviewId: 502,
  },
];

const columnHelper = createColumnHelper<Review>();

export default function ReviewClientPage() {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS || []);
  const [period, setPeriod] = useState<PeriodType>("1MONTH");
  const searchParams = useSearchParams();

  // 페이지네이션 설정
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 10;

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return reviews.slice(start, start + itemsPerPage);
  }, [reviews, currentPage]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("productName", {
        header: "상품명/옵션",
        size: 508,
        cell: (info) => (
          <div className={styles.titleColumn}>
            <div className={styles.title}>
              <div className={styles.productThumb}>
                <Image
                  src={info.row.original.img}
                  width={90}
                  height={90}
                  alt="상품"
                />
              </div>
              <span className={styles.titleText}>{info.getValue()}</span>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("deliveredAt", {
        header: "배송완료일",
        size: 150,
        cell: (info) => (
          <span className={styles.normalNumber}>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("reviewStatus", {
        header: "상태/관리",
        size: 250,
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
                prefetch={false}
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
