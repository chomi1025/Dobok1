"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.scss";
import { Order, OrderItem } from "@prisma/client";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UnifiedTable } from "@/components/common/DataTable";
import PagenationComponent from "@/components/pagenation/page";
import Button from "@/components/common/buttons/page";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

type Period = "today" | "7days" | "30days" | "customDate";

type OrderWithItems = Order & {
  items: OrderItem[];
  manage?: string;
};

interface Props {
  orders: OrderWithItems[];
  total: number;
  pageSize: number;
  currentPage: number;
}

const ORDER_STATUS_MAP: Record<string, string> = {
  PENDING: "결제 대기",
  PAYMENT_COMPLETE: "결제 완료",
  PREPARING: "상품 준비중",
  SHIPPING: "배송 중",
  DELIVERED: "배송 완료",
  CANCELLED: "주문 취소",
};

const columnHelper = createColumnHelper<OrderWithItems>();

export default function OrdersClientPage({
  orders,
  total,
  pageSize,
  currentPage,
}: Props) {
  const searchParams = useSearchParams();

  const [period, setPeriod] = useState<Period>(
    (searchParams.get("period") as Period) || "30days",
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("orderNumber", {
        header: "주문번호",
        meta: { flex: 1.4 },
        cell: (info) => {
          const orderNumber = info.getValue();

          return (
            <div className={styles.orderNumberWrapper}>
              <div className={styles.normalNumber}>{orderNumber}</div>

              <Link
                href={`/admin/orders/${orderNumber}`}
                className={styles.subNumber}
              >
                상세보기
              </Link>
            </div>
          );
        },
      }),

      columnHelper.accessor("createdAt", {
        header: "주문일",
        meta: { flex: 1 },
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      }),

      columnHelper.accessor("buyerName", {
        header: "고객명",
        meta: { flex: 1 },
      }),

      columnHelper.display({
        id: "productName",
        header: "상품명",
        meta: { flex: 3.5 },
        cell: ({ row }) => {
          const items = row.original.items;
          const firstItem = items[0]?.productName || "상품 없음";

          const totalQuantity = items.reduce(
            (sum, item) => sum + (item.quantity || 0),
            0,
          );

          const displayName =
            items.length > 1
              ? `${firstItem} 외 ${items.length - 1}건`
              : firstItem;

          return (
            <Link
              href={`/admin/orders/${row.original.orderNumber}`}
              className={styles.title}
            >
              <div className={styles.productInfo}>
                <span className={styles.titleText}>{displayName}</span>

                <span className={styles.quantityBadge}>
                  총 {totalQuantity}개
                </span>
              </div>
            </Link>
          );
        },
      }),

      columnHelper.accessor("total", {
        header: "합계금액",
        meta: { flex: 1 },
        cell: (info) => {
          return (
            <span className={styles.normalNumber}>
              {info.getValue().toLocaleString()}원
            </span>
          );
        },
      }),

      columnHelper.accessor("status", {
        header: "상태",
        meta: { flex: 1 },
        cell: (info) => {
          const status = info.getValue();

          const getStatusColor = (s: string) => {
            if (s === "CANCELLED") return "#ff4d4f";
            if (s === "PAYMENT_COMPLETE") return "#1890ff";
            if (s === "DELIVERED") return "#52c41a";
            return "#333";
          };

          return (
            <span
              className={styles.statusBadge}
              style={{ color: getStatusColor(status) }}
            >
              {ORDER_STATUS_MAP[status] || status}
            </span>
          );
        },
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.Inner}>
      <header>
        <h1>주문 관리</h1>
      </header>

      {/* 필터 영역 */}
      <OrderFilter period={period} setPeriod={setPeriod} />

      {/* 테이블 */}
      <UnifiedTable table={table} className={styles.orderTable} />

      {/* 페이지네이션 */}
      <PagenationComponent
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </div>
  );
}

const PERIOD_OPTIONS = [
  { label: "30일", value: "30days" },
  { label: "7일", value: "7days" },
  { label: "오늘", value: "today" },
  { label: "날짜선택", value: "customDate" },
] as const;

const formatDate = (date: Date) => {
  return date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\. /g, ".")
    .replace(/\.$/, "");
};

const getPeriodRange = (period: Period) => {
  const end = new Date();
  const start = new Date();

  switch (period) {
    case "today":
      break;
    case "7days":
      start.setDate(end.getDate() - 7);
      break;
    case "30days":
      start.setDate(end.getDate() - 30);
      break;
    case "customDate":
      return "직접 선택";
    default:
      return "기간 설정";
  }

  return `${formatDate(start)} ~ ${formatDate(end)}`;
};

interface FilterProps {
  period: Period;
  setPeriod: (p: Period) => void;
}

function OrderFilter({ period, setPeriod }: FilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 내부 입력 상태들
  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") || "",
  );
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");
  const [orderStatus, setOrderStatus] = useState(
    searchParams.get("status") || "ALL",
  );
  const [searchKeyword, setSearchKeyword] = useState(
    searchParams.get("search") || "",
  );

  const dateRangeText = useMemo(() => getPeriodRange(period), [period]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("period", period);

    if (period === "customDate") {
      if (!startDate || !endDate) {
        toast.error("시작일과 종료일을 모두 선택해주세요.");
        return;
      }
      params.set("startDate", startDate);
      params.set("endDate", endDate);
    }

    if (searchKeyword) params.set("search", searchKeyword);
    if (orderStatus !== "ALL") params.set("status", orderStatus);
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    setPeriod("30days");
    setStartDate("");
    setEndDate("");
    setOrderStatus("ALL");
    setSearchKeyword("");
    router.push(pathname);
  };

  return (
    <section className={styles.OrderFilter} aria-label="주문관리-검색필터">
      <div className={styles.FilterPeriod}>
        <div className={styles.PeriodHeader}>
          <span>기간</span>
          <em className={styles.CurrentRange}>{dateRangeText}</em>
        </div>

        <div className={styles.PeriodWrapper}>
          <ul role="listbox">
            {PERIOD_OPTIONS.map((option) => (
              <li
                key={option.value}
                className={`${styles.List} ${period === option.value ? styles.active : ""}`}
                role="option"
              >
                <button type="button" onClick={() => setPeriod(option.value)}>
                  {option.label}
                </button>
              </li>
            ))}
          </ul>

          <div
            className={`${styles.CustomDateInput} ${period === "customDate" ? styles.show : ""}`}
          >
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={period !== "customDate"}
            />
            <span className={styles.Separator}>~</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={period !== "customDate"}
            />
          </div>
        </div>
      </div>

      <div className={styles.FilterGroup}>
        <div className={styles.FilterOrderStatus}>
          <span>주문상태</span>
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            <option value="ALL">전체</option>
            {Object.entries(ORDER_STATUS_MAP).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.SearchInput}>
          <span>검색</span>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="주문번호 / 고객명 / 상품명 검색"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <div className={styles.FilterActions}>
          <Button onClick={handleSearch}>검색</Button>
          <Button variant="edit" onClick={handleReset}>
            초기화
          </Button>
        </div>
      </div>
    </section>
  );
}
