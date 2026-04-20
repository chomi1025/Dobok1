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

type ClaimType = "cancel" | "exchange" | "return";

type PeriodType = "1MONTH" | "3MONTH" | "6MONTH" | "12MONTH" | "CUSTOM";

interface Claim {
  id: number;
  type: ClaimType;
  requestedAt: string;
  claimNumber: string;
  name: string;
  img: string;
  price: string;
  quantity: number;
  total: string;
}

interface Props {
  claims: Claim[];
}

const CLAIM_TYPE_INFO: Record<ClaimType, { label: string; color: string }> = {
  cancel: { label: "취소", color: "#ff4d4f" },
  exchange: { label: "교환", color: "#1890ff" },
  return: { label: "반품", color: "#faad14" },
};
const columnHelper = createColumnHelper<Claim>();

export default function ClaimsClientPage({ claims: initialClaims }: Props) {
  const [period, setPeriod] = useState<PeriodType>("1MONTH");
  const [customRange, setCustomRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [displayClaims, setDisplayClaims] = useState<Claim[]>(
    initialClaims || [],
  );
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  //목업데이터
  const mockClaims: Claim[] = [
    {
      id: 1,
      type: "cancel",
      requestedAt: "2026-04-05",
      claimNumber: "C-20260405-123",
      name: "프리미엄 선수용 도복 - 화이트",
      img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
      price: "125000",
      quantity: 1,
      total: "125000",
    },
    {
      id: 2,
      type: "exchange",
      requestedAt: "2026-04-03",
      claimNumber: "E-20260403-045",
      name: "컴팩트 훈련용 도복 - 블루",
      img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
      price: "89000",
      quantity: 1,
      total: "89000",
    },
    {
      id: 3,
      type: "return",
      requestedAt: "2026-03-28",
      claimNumber: "R-20260328-999",
      name: "경량 스파링 보호구 세트",
      img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
      price: "45000",
      quantity: 2,
      total: "90000",
    },
    {
      id: 4,
      type: "cancel",
      requestedAt: "2026-03-20",
      claimNumber: "C-20260320-012",
      name: "도복 전용 가방 - 라지",
      img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
      price: "35000",
      quantity: 1,
      total: "35000",
    },
    {
      id: 5,
      type: "exchange",
      requestedAt: "2026-03-15",
      claimNumber: "E-20260315-777",
      name: "입문자용 도복 - 네이비",
      img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
      price: "65000",
      quantity: 1,
      total: "65000",
    },
  ];

  // 페이지네이션 설정
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 10;
  const total = mockClaims.length;

  // 데이터 페이징 처리
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return mockClaims.slice(start, start + itemsPerPage);
  }, [currentPage]);

  useEffect(() => {
    const fetchClaims = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/mypage/claim", {
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
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("type", {
        header: "유형",
        size: 80,
        cell: (info) => {
          const type = CLAIM_TYPE_INFO[info.getValue()];
          return (
            <span style={{ color: type.color, fontWeight: 600 }}>
              {type.label}
            </span>
          );
        },
      }),
      columnHelper.accessor("requestedAt", {
        header: "신청정보",
        size: 150,
        cell: (info) => (
          <div className={styles.orderNumberWrapper}>
            <div className={styles.normalNumber}>{info.getValue()}</div>
            <Link
              href={`/mypage/claim/${info.row.original.claimNumber}`}
              className={styles.subNumber}
              prefetch={false}
            >
              {info.row.original.claimNumber}
            </Link>
          </div>
        ),
      }),
      columnHelper.accessor("name", {
        header: "상품명/옵션",
        size: 428,
        cell: (info) => (
          <div className={styles.titleColumn}>
            <div className={styles.title}>
              <div className={styles.productThumb}>
                <Image
                  src={info.row.original.img}
                  width={90}
                  height={90}
                  alt={info.row.original.name}
                />
              </div>
              <span className={styles.titleText}>{info.getValue()}</span>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("price", {
        header: "상품금액/수량",
        size: 120,
        cell: (info) => (
          <div className={styles.priceInfo}>
            <strong>{Number(info.getValue()).toLocaleString()}원</strong>
            <span>{info.row.original.quantity}개</span>
          </div>
        ),
      }),
      columnHelper.accessor("total", {
        header: "합계금액",
        size: 130,
        cell: (info) => (
          <span className={styles.totalPrice}>
            {Number(info.getValue()).toLocaleString()}원
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
