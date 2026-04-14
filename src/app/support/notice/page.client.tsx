"use client";
import styles from "./page.module.scss";
import { Column, Table } from "@/components/Table/page";
import Link from "next/link";
import BoardLayout from "@/components/common/boardLayout/page";
import { useSession } from "next-auth/react";
import { Pin } from "lucide-react";
import { useMemo } from "react";

interface NoticeRow {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  isFixed: boolean;
}

interface Props {
  role?: "ADMIN" | "USER" | null;
  allNotices: NoticeRow[];
  total: number;
  pageSize: number;
  currentPage: number;
}

export default function NoticeClientPage({
  allNotices,
  total,
  pageSize,
  currentPage,
}: Props) {
  const { data: session } = useSession();
  const role = session?.user?.role ?? "USER";

  const fixedCount = allNotices.filter((n) => n.isFixed).length;

  const noticeColumns: Column<NoticeRow>[] = useMemo(
    () => [
      {
        key: "number",
        label: "번호",
        flex: 0.3,
        render: (row, index) => {
          if (row.isFixed)
            return <div className={styles.fixedPinWrapper}>📌</div>;
          const normalIndex = index - fixedCount;
          const virtualNumber =
            total - (currentPage - 1) * pageSize - normalIndex;
          return <span className={styles.normalNumber}>{virtualNumber}</span>;
        },
      },
      {
        key: "title",
        label: "제목",
        flex: 2,
        render: (row) => (
          <Link
            href={`/support/notice/${row.id}`}
            prefetch={false}
            className={styles.title}
          >
            <span
              className={`${styles.noticeBadge} ${!row.isFixed ? styles.empty : ""}`}
            >
              {row.isFixed ? "필독" : ""}
            </span>
            <span className={styles.titleText}>{row.title}</span>
          </Link>
        ),
      },
      {
        key: "date",
        label: "날짜",
        flex: 0.6,
        render: (row) => (
          <span>{new Date(row.createdAt).toLocaleDateString()}</span>
        ),
      },
    ],
    [total, currentPage, pageSize, fixedCount],
  ); // 의존성 배열
  return (
    <>
      <BoardLayout
        title="공지사항"
        tableTitle="공지사항 테이블"
        role={role}
        writeHref="/support/notice/new"
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
        isRestricted={true}
      >
        <Table
          columns={noticeColumns}
          data={allNotices}
          getRowProps={(row) => ({
            className: row.isFixed ? styles.fixedRow : "",
          })}
        />
      </BoardLayout>
    </>
  );
}
