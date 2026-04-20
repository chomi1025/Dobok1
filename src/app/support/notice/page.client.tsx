"use client";
import styles from "./page.module.scss";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Fragment, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UnifiedTable } from "@/components/common/DataTable";
import Button from "@/components/common/buttons/page";
import PagenationComponent from "@/components/pagenation/page";

interface NoticeRow {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  isFixed: boolean;
}

interface Props {
  pageSize: number;
  currentPage: number;
}

export default function NoticeClientPage({ pageSize, currentPage }: Props) {
  const { data: session } = useSession();
  const role = session?.user?.role ?? "USER";

  const { data } = useQuery({
    queryKey: ["notices", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `/api/notice?page=${currentPage}&pageSize=${pageSize}`,
      );
      return res.json();
    },

    staleTime: 60 * 1000,
  });
  const allNotices = data?.allNotices || [];
  const total = data?.total || 0;
  const fixedCount = useMemo(
    () => allNotices.filter((n: NoticeRow) => n.isFixed).length,
    [allNotices],
  );

  const columnHelper = createColumnHelper<NoticeRow>();

  const noticeColumns = useMemo(
    () => [
      columnHelper.display({
        id: "number",
        header: "번호",
        size: 80,
        cell: ({ row }) => {
          const item = row.original;
          if (item.isFixed)
            return <div className={styles.fixedPinWrapper}>📌</div>;

          const normalIndex = row.index - fixedCount;
          const virtualNumber =
            total - (currentPage - 1) * pageSize - normalIndex;
          return <span className={styles.normalNumber}>{virtualNumber}</span>;
        },
      }),
      columnHelper.accessor("title", {
        header: "제목",
        size: 708,
        cell: ({ row }) => (
          <Link
            href={`/support/notice/${row.original.id}`}
            className={styles.title}
            prefetch={false}
          >
            {row.original.isFixed && (
              <span className={styles.noticeBadge}>필독</span>
            )}

            <span className={styles.titleText}>{row.original.title}</span>
          </Link>
        ),
      }),
      columnHelper.accessor("createdAt", {
        header: "날짜",
        size: 120,
        cell: ({ getValue }) => {
          const d = new Date(getValue());
          return (
            <span>
              {`${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`}
            </span>
          );
        },
      }),
    ],
    [total, currentPage, pageSize, fixedCount, columnHelper],
  );

  const table = useReactTable({
    data: allNotices,
    columns: noticeColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.inner}>
      <header className={styles.titleWrapper}>
        <h1>공지사항</h1>

        {role === "ADMIN" ? (
          <Button href="/support/notice/new" variant="primary">
            작성하기
          </Button>
        ) : (
          ""
        )}
      </header>

      <UnifiedTable
        table={table}
        className={styles.noticeTable}
        getRowProps={(row) => ({
          className: row.original.isFixed ? styles.fixedRow : "",
        })}
      />

      <PagenationComponent
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </div>
  );
}
