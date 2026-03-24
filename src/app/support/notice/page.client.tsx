"use client";
import styles from "./page.module.scss";
import { Table } from "@/components/Table/page";
import Link from "next/link";
import BoardLayout from "@/components/common/boardLayout/page";

interface NoticeRow {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  isFixed: boolean;
}

interface Props {
  role?: "ADMIN" | "USER" | string | null;
  allNotices: NoticeRow[];
  total: number;
  pageSize: number;
  currentPage: number;
}

export default function NoticeClientPage({
  role,
  allNotices,
  total,
  pageSize,
  currentPage,
}: Props) {
  const noticeColumns = [
    {
      key: "number",
      label: "번호",
      flex: 0.3,
      render: (row: NoticeRow, index: number) => {
        const virtualNumber = total - (currentPage - 1) * pageSize - index;
        if (row.isFixed) return <span className={styles.fixedBadge}>공지</span>;
        return <span>{virtualNumber}</span>;
      },
    },
    {
      key: "title",
      label: "제목",
      flex: 2,

      render: (row: NoticeRow) => (
        <Link href={`/support/notice/${row.id}`} className={styles.title}>
          <span className={styles.fixedNotice}>
            {row.isFixed ? "[공지] " : ""}
          </span>

          <span className={styles.titleText}>{row.title}</span>
        </Link>
      ),
    },
    {
      key: "date",
      label: "날짜",
      flex: 0.6,
      render: (row: NoticeRow) => (
        <span>{new Date(row.createdAt).toLocaleDateString()}</span>
      ),
    },
  ];

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
        isRestricted={false}
      >
        <Table columns={noticeColumns} data={allNotices} />
      </BoardLayout>
    </>
  );
}
