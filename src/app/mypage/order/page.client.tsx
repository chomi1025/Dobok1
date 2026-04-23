"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PeriodTabsComponent from "@/components/mypage/PeriodTabs";
import styles from "./page.module.scss";
import Image from "next/image";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UnifiedTable } from "@/components/common/DataTable";
import PagenationComponent from "@/components/pagenation/page";
import { useSearchParams } from "next/navigation";

export type OrderStatus =
  | "PAYMENT_COMPLETE"
  | "PREPARING"
  | "SHIPPING"
  | "DELIVERED";

type PeriodType = "1MONTH" | "3MONTH" | "6MONTH" | "12MONTH" | "CUSTOM";

const statusMap: Record<OrderStatus, { label: string; color: string }> = {
  PAYMENT_COMPLETE: { label: "결제완료", color: "#333" },
  PREPARING: { label: "상품준비중", color: "#2ecc71" },
  SHIPPING: { label: "배송중", color: "#3498db" },
  DELIVERED: { label: "배송완료", color: "#95a5a6" },
};

export interface Order {
  id: number;
  date: string;
  orderNumber: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  status: OrderStatus;
  claims?: {
    id: number;
    claimType: "RETURN" | "EXCHANGE";
    status: string;
  }[];
  reviewWritten?: boolean;
}

const mockOrders: Order[] = [
  {
    id: 1,
    date: "2026-03-16",
    orderNumber: "ORD-20260316-001",
    img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
    name: "프리미엄 선수용 도복 - 화이트",
    price: 125000,
    quantity: 1,
    total: 125000,
    status: "DELIVERED",
    reviewWritten: false,
  },
  {
    id: 2,
    date: "2026-03-15",
    orderNumber: "ORD-20260315-042",
    img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
    name: "컴팩트 훈련용 도복 - 블루",
    price: 89000,
    quantity: 2,
    total: 178000,
    status: "SHIPPING",
  },
  {
    id: 3,
    date: "2026-03-10",
    orderNumber: "ORD-20260310-015",
    img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
    name: "고급 면 띠 - 블랙",
    price: 25000,
    quantity: 1,
    total: 25000,
    status: "DELIVERED",
    reviewWritten: true,
  },
  {
    id: 4,
    date: "2026-03-05",
    orderNumber: "ORD-20260305-088",
    img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
    name: "경량 스파링 보호구 세트",
    price: 45000,
    quantity: 1,
    total: 45000,
    status: "PREPARING",
  },
  {
    id: 5,
    date: "2026-02-28",
    orderNumber: "ORD-20260228-011",
    img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
    name: "도복 전용 가방 - 라지",
    price: 35000,
    quantity: 1,
    total: 35000,
    status: "PAYMENT_COMPLETE",
  },
  {
    id: 6,
    date: "2026-02-20",
    orderNumber: "ORD-20260220-099",
    img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
    name: "입문자용 도복 - 네이비",
    price: 65000,
    quantity: 1,
    total: 65000,
    status: "DELIVERED",
    reviewWritten: false,
    claims: [{ id: 101, claimType: "EXCHANGE", status: "REQUESTED" }], // 교환 신청 테스트용
  },
  {
    id: 7,
    date: "2026-02-15",
    orderNumber: "ORD-20260215-023",
    img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
    name: "운동용 기능성 티셔츠",
    price: 19000,
    quantity: 3,
    total: 57000,
    status: "DELIVERED",
    reviewWritten: true,
  },
  {
    id: 8,
    date: "2026-02-10",
    orderNumber: "ORD-20260210-055",
    img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
    name: "패딩 도복 코트",
    price: 158000,
    quantity: 1,
    total: 158000,
    status: "DELIVERED",
    reviewWritten: false,
  },
  {
    id: 9,
    date: "2026-01-25",
    orderNumber: "ORD-20260125-077",
    img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
    name: "무릎 보호대 - M",
    price: 12000,
    quantity: 2,
    total: 24000,
    status: "DELIVERED",
    reviewWritten: false,
  },
  {
    id: 10,
    date: "2026-01-05",
    orderNumber: "ORD-20260105-012",
    img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
    name: "프로용 글러브 12oz",
    price: 88000,
    quantity: 1,
    total: 88000,
    status: "DELIVERED",
    reviewWritten: true,
  },
];

const columnHelper = createColumnHelper<Order>();

export default function OrdersClientPage() {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<PeriodType>("1MONTH");
  const [customRange, setCustomRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setCurrentPage(pageParam);
  }, [pageParam]);

  //목업데이터로 계산(나중에 지우깅)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // 한 페이지에 보여줄 개수
  const total = mockOrders.length;

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return mockOrders.slice(start, start + pageSize);
  }, [currentPage]);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          setAllOrders(mockOrders);
          setLoading(false);
        }, 500);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("date", {
        header: "날짜/주문번호",
        size: 150,
        cell: (info) => (
          <div className={styles.orderNumberWrapper}>
            <div className={styles.normalNumber}>{info.getValue()}</div>
            <div className={styles.subNumber}>
              {info.row.original.orderNumber}
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("name", {
        header: "상품명/옵션",
        size: 458,
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
              <Link
                href={`/orders/${info.row.original.id}`}
                className={styles.titleText}
                prefetch={false}
              >
                {info.getValue()}
              </Link>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("quantity", {
        header: "수량",
        size: 100,
        cell: (info) => (
          <span className={styles.normalNumber}>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("total", {
        header: "합계금액",
        size: 100,
        cell: (info) => (
          <span className={styles.normalNumber}>
            {info.getValue().toLocaleString()}원
          </span>
        ),
      }),
      columnHelper.accessor("status", {
        header: "주문상태",
        size: 100,
        cell: (info) => {
          const status = statusMap[info.getValue()] || {
            label: info.getValue(),
            color: "#333",
          };
          return (
            <div className={styles.statusBadge} style={{ color: status.color }}>
              {status.label}
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
      <header>
        <h1>주문/배송 조회</h1>

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

      <UnifiedTable table={table} className={styles.orderTable} />

      <PagenationComponent
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </div>
  );
}
