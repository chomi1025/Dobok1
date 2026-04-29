"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.scss";
import { User } from "@prisma/client";
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
const PERIOD_OPTIONS = [
  { label: "30일", value: "30days" },
  { label: "7일", value: "7days" },
  { label: "오늘", value: "today" },
  { label: "날짜선택", value: "customDate" },
] as const;

type Period = (typeof PERIOD_OPTIONS)[number]["value"];

interface UserFilterProps {
  period: Period;
  setPeriod: (p: Period) => void;
}

interface Props {
  users: User[];
  total: number;
  pageSize: number;
  currentPage: number;
}

const columnHelper = createColumnHelper<User>();

export default function UsersClientPage({
  users,
  total,
  pageSize,
  currentPage,
}: Props) {
  const router = useRouter();
  const [period, setPeriod] = useState<Period>("30days");

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "번호",
        size: 60,
        cell: (info) => info.row.index + 1 + (currentPage - 1) * pageSize,
      }),
      columnHelper.accessor("username", {
        header: "아이디",
        size: 180,
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("name", {
        header: "회원명",
        size: 100,
        cell: (info) => (
          <div className={styles.orderNumberWrapper}>
            <div className={styles.normalNumber}>
              {info.getValue() || "이름없음"}
            </div>
            <Link
              href={`/admin/users/${info.row.original.id}`}
              className={styles.subNumber}
              prefetch={false}
            >
              상세보기
            </Link>
          </div>
        ),
      }),
      columnHelper.accessor("nickname", {
        header: "닉네임",
        size: 120,
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("phone" as any, {
        size: 140,
        cell: (info) => {
          const phone = info.getValue();
          return phone ? phone : "-";
        },
      }),
      columnHelper.accessor("createdAt", {
        header: "가입일",
        size: 120,
        cell: (info) => {
          const date = info.getValue();
          return date ? new Date(date).toLocaleDateString() : "-";
        },
      }),
      columnHelper.accessor("manage" as any, {
        id: "manage",
        header: "관리",
        size: 80,
        cell: (info) => (
          <Button
            variant="edit"
            onClick={() => router.push(`/admin/users/${info.row.original.id}`)}
          >
            수정
          </Button>
        ),
      }),
    ],
    [currentPage, pageSize],
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.Inner} style={{ width: "908px" }}>
      <header>
        <h1>회원 관리</h1>
      </header>

      <UserFilter period={period} setPeriod={setPeriod} />

      <UnifiedTable table={table} className={styles.orderTable} />

      <PagenationComponent
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </div>
  );
}

function UserFilter({ period, setPeriod }: UserFilterProps) {
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
      }) // 결과: "2026. 04. 28."
      .replace(/\. /g, ".") // 공백 제거: "2026.04.28."
      .replace(/\.$/, ""); // 마지막 점 제거: "2026.04.28"
  };

  const getPeriodRange = (period: Period) => {
    const end = new Date(); // 오늘
    const start = new Date(); // 시작일 계산용 변수

    switch (period) {
      case "today":
        // 시작일이 오늘 그대로
        break;
      case "7days":
        start.setDate(end.getDate() - 7);
        break;
      case "30days":
        start.setDate(end.getDate() - 30);
        break;
      case "customDate":
        // 달력에서 직접 고르는 모드일 때는 텍스트를 따로 표시
        return "직접 선택";
      default:
        return "기간 설정";
    }

    // formatDate 함수를 이용해 "YYYY.MM.DD ~ YYYY.MM.DD" 형식으로 반환
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
          <span>가입일자</span>
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
            <option value="ACTIVE">활동 중</option>
            <option value="BANNED">이용 제한</option>
            <option value="WITHDRAWN">탈퇴 회원</option>
          </select>
        </div>

        <div className={styles.SearchInput}>
          <span>검색</span>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="이름, 이메일, 연락처 검색"
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
