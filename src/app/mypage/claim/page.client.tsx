"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { useEffect, useMemo, useState } from "react";
import PeriodTabsComponent from "@/components/mypage/PeriodTabs";
import PagenationComponent from "@/components/pagenation/page";
import Image from "next/image";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { UnifiedTable } from "@/components/common/DataTable";

type ClaimType = "CANCEL" | "EXCHANGE" | "RETURN";

type PeriodType = "1MONTH" | "3MONTH" | "6MONTH" | "12MONTH" | "CUSTOM";

interface Claim {
  id: number;
  claimType: ClaimType;
  requestedAt: string;
  claimNumber: string;
  name: string;
  img: string;
  price: string;
  quantity: number;
  total: string;
}

const CLAIM_TYPE_INFO: Record<ClaimType, { label: string; color: string }> = {
  CANCEL: { label: "취소", color: "#ff4d4f" },
  EXCHANGE: { label: "교환", color: "#1890ff" },
  RETURN: { label: "반품", color: "#faad14" },
} satisfies Record<ClaimType, { label: string; color: string }>;

const columnHelper = createColumnHelper<Claim>();

export default function ClaimsClientPage() {
  const [period, setPeriod] = useState<PeriodType>("1MONTH");
  const [customRange, setCustomRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [displayClaims, setDisplayClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // 페이지네이션 설정
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 10;
  const total = loading ? 10 : displayClaims.length;

  // 데이터
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return displayClaims.slice(start, start + itemsPerPage);
  }, [displayClaims, currentPage]);

  const skeletonRows: Claim[] = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    claimType: "CANCEL",
    requestedAt: "",
    claimNumber: "",
    name: "",
    img: "",
    price: "0",
    quantity: 0,
    total: "0",
  }));

  useEffect(() => {
    const fetchClaims = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/claim", {
          credentials: "include",
        });
        if (res.ok) {
          const data: Claim[] = await res.json();
          setDisplayClaims(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("claimType", {
        header: "유형",
        meta: { flex: 1 },
        cell: (info) => {
          if (loading) {
            return <div className={styles.skeletonBoxSmall} />;
          }

          const type = CLAIM_TYPE_INFO[info.getValue()];

          return (
            <div className={styles.orderNumberWrapper}>
              <span>{type.label}</span>
            </div>
          );
        },
      }),

      columnHelper.accessor("requestedAt", {
        header: "신청정보",
        meta: { flex: 2 },
        cell: (info) => {
          if (loading) {
            return (
              <div className={styles.skeletonDateWrapper}>
                <div className={styles.skeletonLineSmall} />
                <div className={styles.skeletonLineTiny} />
              </div>
            );
          }

          const formatDate = (date: string) =>
            new Date(date).toISOString().slice(0, 10);

          return (
            <div className={styles.orderNumberWrapper}>
              <div className={styles.normalNumber}>
                {formatDate(info.getValue())}
              </div>

              <Link
                href={`/mypage/claim/${info.row.original.claimNumber}`}
                className={styles.subNumber}
                prefetch={false}
              >
                {info.row.original.claimNumber}
              </Link>
            </div>
          );
        },
      }),

      columnHelper.accessor("name", {
        header: "상품명/옵션",
        meta: { flex: 6.5 },
        cell: (info) => {
          if (loading) {
            return (
              <div className={styles.titleColumn}>
                <div className={styles.skeletonThumb} />

                <div className={styles.skeletonTextGroup}>
                  <div className={styles.skeletonLine} />
                </div>
              </div>
            );
          }

          return (
            <div className={styles.titleColumn}>
              <div className={styles.title}>
                <div className={styles.productThumb}>
                  <Image
                    src={info.row.original.img || "/images/no-image.png"}
                    width={70}
                    height={70}
                    alt={info.row.original.name}
                  />
                </div>

                <span className={styles.titleText}>{info.getValue()}</span>
              </div>
            </div>
          );
        },
      }),

      columnHelper.accessor("price", {
        header: "상품금액/수량",
        meta: { flex: 1.5 },
        cell: (info) => {
          if (loading) {
            return (
              <div className={styles.priceInfo}>
                <div className={styles.skeletonBox} />
                <div className={styles.skeletonBoxSmall} />
              </div>
            );
          }

          return (
            <div className={styles.priceInfo}>
              <strong>{Number(info.getValue()).toLocaleString()}원</strong>

              <span>{info.row.original.quantity}개</span>
            </div>
          );
        },
      }),

      columnHelper.accessor("total", {
        header: "합계금액",
        meta: { flex: 1.5 },
        cell: (info) => {
          if (loading) {
            return <div className={styles.skeletonBox} />;
          }

          return (
            <span className={styles.totalPrice}>
              {Number(info.getValue()).toLocaleString()}원
            </span>
          );
        },
      }),
    ],
    [loading],
  );

  const table = useReactTable({
    data: loading ? skeletonRows : paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.inner}>
      <header className={styles.pageHeader}>
        <h1>취소/교환/반품 조회</h1>

        {/* 날짜 선택 탭 */}
        <PeriodTabsComponent
          period={period}
          onPeriodChange={(p) => {
            setPeriod(p);
            setCustomRange(null);
          }}
          onCustomSubmit={(start, end) => {
            setPeriod("CUSTOM");
            setCustomRange({ start, end });
          }}
        />
      </header>

      {/* 테이블 목록 */}
      <div className={styles.tableWrapper}>
        <UnifiedTable table={table} className={styles.noticeTable} />
      </div>

      <div className={styles.paginationSection}>
        <PagenationComponent
          total={total}
          pageSize={itemsPerPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
