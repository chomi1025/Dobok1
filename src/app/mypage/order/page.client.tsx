"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export type OrderStatus =
  | "PAYMENT_COMPLETE"
  | "PREPARING"
  | "SHIPPING"
  | "DELIVERED"
  | "CANCELLED"
  | "PENDING";

type PeriodType = "1MONTH" | "3MONTH" | "6MONTH" | "12MONTH" | "CUSTOM";

const statusMap: Record<string, { label: string; color: string }> = {
  PAYMENT_COMPLETE: { label: "결제완료", color: "#333" },
  PREPARING: { label: "상품준비중", color: "#2ecc71" },
  SHIPPING: { label: "배송중", color: "#3498db" },
  DELIVERED: { label: "배송완료", color: "#95a5a6" },
  CANCELLED: { label: "취소", color: "#e74c3c" },
  PENDING: { label: "결제대기", color: "#f39c12" },
};

export interface OrderItem {
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  date: string;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

function getPeriodRange(
  period: PeriodType,
  customRange: { start: Date; end: Date } | null,
): { from: Date; to: Date } {
  if (period === "CUSTOM" && customRange) {
    return {
      from: startOfDay(customRange.start),
      to: endOfDay(customRange.end),
    };
  }

  const to = endOfDay(new Date());
  const from = new Date();
  from.setHours(0, 0, 0, 0);

  switch (period) {
    case "3MONTH":
      from.setMonth(from.getMonth() - 3);
      break;
    case "6MONTH":
      from.setMonth(from.getMonth() - 6);
      break;
    case "12MONTH":
      from.setMonth(from.getMonth() - 12);
      break;
    case "1MONTH":
    default:
      from.setMonth(from.getMonth() - 1);
      break;
  }

  return { from, to };
}

function parseOrderDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return startOfDay(new Date(y, (m ?? 1) - 1, d ?? 1));
}

const columnHelper = createColumnHelper<Order>();

export default function OrdersClientPage() {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<PeriodType>("1MONTH");
  const [customRange, setCustomRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const pageParam = Number(searchParams.get("page")) || 1;
  const pageSize = 5;

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/mypage/orders", {
          credentials: "include",
        });
        if (res.status === 401) {
          setError("로그인이 필요합니다.");
          setAllOrders([]);
          return;
        }
        if (!res.ok) {
          setError("주문 목록을 불러오지 못했습니다.");
          setAllOrders([]);
          return;
        }
        const data = (await res.json()) as Order[];
        setAllOrders(data);
      } catch {
        setError("주문 목록을 불러오지 못했습니다.");
        setAllOrders([]);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const { from, to } = getPeriodRange(period, customRange);
    return allOrders.filter((o) => {
      const od = parseOrderDate(o.date);
      return od >= from && od <= to;
    });
  }, [allOrders, period, customRange]);

  const total = filteredOrders.length;
  const totalPages = total === 0 ? 0 : Math.ceil(total / pageSize);
  const currentPage = totalPages === 0 ? 1 : Math.min(pageParam, totalPages);

  useEffect(() => {
    if (totalPages > 0 && pageParam > totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(totalPages));
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [totalPages, pageParam, pathname, router, searchParams]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, currentPage, pageSize]);

  const resetPage = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("date", {
        header: "날짜/주문번호",
        meta: { flex: 2 },
        cell: (info) => (
          <div className={styles.orderNumberWrapper}>
            {loading ? (
              <div className={styles.skeletonDateWrapper}>
                <div className={styles.skeletonLineSmall} />

                <div className={styles.skeletonLineSmall} />
              </div>
            ) : (
              <>
                <div className={styles.normalNumber}>{info.getValue()}</div>

                <div className={styles.subNumber}>
                  {info.row.original.orderNumber}
                </div>
              </>
            )}
          </div>
        ),
      }),

      columnHelper.accessor("items", {
        header: "상품명/옵션",
        meta: { flex: 4 },
        cell: (info) => {
          const items = info.getValue() ?? [];
          const first = items[0];

          return (
            <div className={styles.itemWrapper}>
              {loading ? (
                <>
                  <div className={styles.skeletonThumb} />

                  <div className={styles.skeletonTextGroup}>
                    <div className={styles.skeletonLine} />
                  </div>
                </>
              ) : (
                <>
                  <Image
                    src={first.productImage || "/images/no-image.png"}
                    width={70}
                    height={70}
                    alt={first.productName}
                    style={{ display: "block" }}
                  />

                  <Link
                    href={`/mypage/order/${info.row.original.orderNumber}`}
                    className={styles.link}
                    prefetch={false}
                  >
                    <p>
                      {first.productName}
                      {items.length > 1 && ` 외 ${items.length - 1}건`}
                    </p>
                  </Link>
                </>
              )}
            </div>
          );
        },
      }),

      columnHelper.accessor("items", {
        id: "quantity",
        header: "수량",
        meta: { flex: 1 },
        cell: (info) => {
          const items = info.getValue() ?? [];

          const totalQty = items.reduce(
            (sum, i) => sum + (i?.quantity ?? 0),
            0,
          );

          return loading ? (
            <div className={styles.skeletonBoxSmall} />
          ) : (
            <span>{totalQty}</span>
          );
        },
      }),

      columnHelper.accessor("total", {
        header: "합계금액",
        meta: { flex: 1 },
        cell: (info) =>
          loading ? (
            <div className={styles.skeletonBoxSmall} />
          ) : (
            <span>{info.getValue().toLocaleString()}원</span>
          ),
      }),

      columnHelper.accessor("status", {
        header: "주문상태",
        meta: { flex: 1 },
        cell: (info) => {
          if (loading) return <div className={styles.skeletonBoxSmall} />;

          const status = statusMap[info.getValue()];

          return (
            <div
              className={styles.statusBadge}
              style={{ color: status?.color ?? "#333" }}
            >
              {status?.label ?? info.getValue()}
            </div>
          );
        },
      }),
    ],
    [loading],
  );

  const skeletonData: Order[] = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    date: "",
    orderNumber: "",
    items: [],
    total: 0,
    status: "PENDING",
  }));

  const tableData = loading ? skeletonData : paginatedData;

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.inner}>
      <header>
        <h1>주문/배송 조회</h1>

        <PeriodTabsComponent
          period={period}
          onPeriodChange={(p) => {
            setPeriod(p);
            setCustomRange(null);
            resetPage();
          }}
          onCustomSubmit={(start, end) => {
            setPeriod("CUSTOM");
            setCustomRange({ start, end });
            resetPage();
          }}
        />
      </header>

      {!loading && error && (
        <p style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
          {error}
        </p>
      )}

      <UnifiedTable table={table} className={styles.orderTable} />

      <PagenationComponent
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </div>
  );
}
