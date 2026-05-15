"use client";

import { customConfirm } from "@/lib/swal";
import styles from "./page.module.scss";
import toast from "react-hot-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import Button from "@/components/common/buttons/page";
import { UnifiedTable } from "@/components/common/DataTable";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface UserFilterProps {
  period: Period;
  setPeriod: (p: Period) => void;
}

const STATUS_MAP: Record<string, string> = {
  PENDING: "승인대기",
  APPROVED: "승인완료",
  REJECTED: "반려",
};

interface BusinessUser {
  id: number;
  username: string;
  businessStatus: string;

  businessInfo: {
    companyName: string;
    representative: string;
    businessNumber: string;
    paperUrl: string;
    createdAt: string;
  } | null;
}

interface Props {
  users: BusinessUser[];
  total: number;
  pageSize: number;
  currentPage: number;
}

const PERIOD_OPTIONS = [
  { label: "30일", value: "30days" },
  { label: "7일", value: "7days" },
  { label: "오늘", value: "today" },
  { label: "날짜선택", value: "customDate" },
] as const;

type Period = (typeof PERIOD_OPTIONS)[number]["value"];

const columnHelper = createColumnHelper<BusinessUser>();

export default function BusinessUsersClientPage({
  users,
  total,
  pageSize,
  currentPage,
}: Props) {
  const router = useRouter();

  const [period, setPeriod] = useState<Period>("30days");

  const handleBusinessStatus = async (
    userId: number,
    status: "APPROVED" | "REJECTED",
  ) => {
    const isApprove = status === "APPROVED";

    const result = await customConfirm({
      title: isApprove ? "사업자 승인" : "사업자 반려",

      text: isApprove
        ? "해당 회원을 승인하시겠습니까?"
        : "해당 회원을 반려하시겠습니까?",

      confirmText: isApprove ? "승인" : "반려",

      isDanger: !isApprove,
    });

    if (!result.isConfirmed) return;

    const res = await fetch("/api/admin/business/status", {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userId,
        status,
      }),
    });

    if (!res.ok) {
      toast.error("처리 실패");
      return;
    }

    toast.success(isApprove ? "사업자 승인 완료" : "사업자 반려 완료");

    router.refresh();
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "번호",
        meta: { flex: 0.6 },

        cell: (info) => info.row.index + 1 + (currentPage - 1) * pageSize,
      }),

      columnHelper.accessor("businessInfo.companyName", {
        header: "업체명",
        meta: { flex: 2.5 },

        cell: (info) => (
          <div className={styles.companyWrapper}>
            <strong>{info.getValue() || "-"}</strong>

            <span className={styles.subText}>{info.row.original.username}</span>
          </div>
        ),
      }),

      columnHelper.accessor("businessInfo.representative", {
        header: "대표자",
        meta: { flex: 1.2 },

        cell: (info) => info.getValue() || "-",
      }),

      columnHelper.accessor("businessInfo.businessNumber", {
        header: "사업자번호",
        meta: { flex: 1.8 },

        cell: (info) => info.getValue() || "-",
      }),

      columnHelper.accessor("businessInfo.paperUrl", {
        header: "첨부파일",
        meta: { flex: 1.2 },

        cell: (info) => {
          const fileUrl = info.getValue();

          return fileUrl ? (
            <button
              className={styles.fileBtn}
              onClick={() =>
                window.open(fileUrl, "_blank", "noopener,noreferrer")
              }
            >
              파일보기
            </button>
          ) : (
            "-"
          );
        },
      }),

      columnHelper.accessor("businessStatus", {
        header: "상태",
        meta: { flex: 1 },

        cell: (info) => {
          const status = info.getValue();

          return (
            <span
              className={`${styles.status} ${styles[status.toLowerCase()]}`}
            >
              {STATUS_MAP[status]}
            </span>
          );
        },
      }),

      columnHelper.accessor("businessInfo.createdAt", {
        header: "신청일",
        meta: { flex: 1.8 },

        cell: (info) => {
          const date = info.getValue();

          return date
            ? new Date(date).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-";
        },
      }),

      columnHelper.display({
        id: "manage",
        header: "관리",
        meta: { flex: 1.8 },

        cell: (info) => {
          const user = info.row.original;

          return (
            <div className={styles.actionGroup}>
              <Button
                disabled={user.businessStatus === "APPROVED"}
                onClick={() => handleBusinessStatus(user.id, "APPROVED")}
              >
                승인
              </Button>

              <Button
                variant="delete"
                disabled={user.businessStatus === "REJECTED"}
                onClick={() => handleBusinessStatus(user.id, "REJECTED")}
              >
                반려
              </Button>
            </div>
          );
        },
      }),
    ],
    [currentPage, pageSize, handleBusinessStatus],
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>회원 관리 (사업자)</h1>
          <p className={styles.desc}>
            사업자 회원 승인 및 상태를 관리할 수 있습니다.
          </p>
        </div>
      </div>

      <UserFilter period={period} setPeriod={setPeriod} />

      <UnifiedTable table={table} className={styles.dataTable} />
    </div>
  );
}

export function UserFilter({ period, setPeriod }: UserFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") || "",
  );
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");
  const [userStatus, setUserStatus] = useState(
    searchParams.get("status") || "ALL",
  );
  const [searchKeyword, setSearchKeyword] = useState(
    searchParams.get("search") || "",
  );
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

  const dateRangeText = useMemo(() => getPeriodRange(period), [period]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("period", period);

    if (period === "customDate") {
      if (!startDate || !endDate) {
        toast.error("조회 시작일과 종료일을 선택해주세요.");
        return;
      }
      params.set("startDate", startDate);
      params.set("endDate", endDate);
    }

    if (userStatus !== "ALL") params.set("status", userStatus);
    if (searchKeyword) params.set("search", searchKeyword);
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    setPeriod("30days");
    setStartDate("");
    setEndDate("");
    setUserStatus("ALL");
    setSearchKeyword("");
    router.push(pathname);
  };
  return (
    <section className={styles.OrderFilter} aria-label="회원관리-검색필터">
      {/* 기간 필터: 가입일 기준 */}
      <div className={styles.FilterPeriod}>
        <div className={styles.PeriodHeader}>
          <span>신청일자</span>
          <em className={styles.CurrentRange}>{dateRangeText}</em>
        </div>

        <div className={styles.PeriodWrapper}>
          <ul role="listbox">
            {PERIOD_OPTIONS.map((option) => (
              <li
                key={option.value}
                className={`${styles.List} ${period === option.value ? styles.active : ""}`}
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

      {/* 회원 상태 및 텍스트 검색 */}
      <div className={styles.FilterGroup}>
        <div className={styles.FilterOrderStatus}>
          <span>회원상태</span>
          <select
            value={userStatus}
            onChange={(e) => setUserStatus(e.target.value)}
          >
            <option value="ALL">전체 상태</option>
            {Object.entries(STATUS_MAP).map(([key, value]) => {
              return (
                <option key={key} value={key}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>

        <div className={styles.SearchInput}>
          <span>검색</span>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="업체명,사업자 번호 검색"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <div className={styles.FilterActions}>
          <Button onClick={handleSearch}>회원 조회</Button>
          <Button variant="edit" onClick={handleReset}>
            초기화
          </Button>
        </div>
      </div>
    </section>
  );
}
