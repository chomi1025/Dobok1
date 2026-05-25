"use client";

import {
  ColumnDef,
  getCoreRowModel,
  TableMeta,
  useReactTable,
} from "@tanstack/react-table";
import styles from "../page.module.scss";
import Link from "next/link";
import { UnifiedTable } from "@/components/common/DataTable";

export interface EstimatePost {
  id: string;
  title: string;
  writer: string;
  status: "WAITING" | "PROCESSING" | "DONE";
  createdAt: Date;
  answeredAt: Date;
  productName?: string;
  quantity?: number;
  isSecret?: boolean;
}

type EstimateMeta = {
  totalCount: number;
  currentPage: number;
  pageSize: number;
};

type EstimateTableMeta = TableMeta<EstimatePost> & EstimateMeta;

interface Props {
  estimates: EstimatePost[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

const columns: ColumnDef<EstimatePost>[] = [
  {
    id: "rowNumber",
    header: "번호",

    meta: {
      flex: 0.6,
    },

    cell: ({ row, table }) => {
      const total = table.options.meta?.totalCount ?? 0;
      const currentPage = table.options.meta?.currentPage ?? 1;
      const pageSize = table.options.meta?.pageSize ?? 10;

      return (
        <span className={styles.number}>
          {total - ((currentPage - 1) * pageSize + row.index)}
        </span>
      );
    },
  },

  {
    accessorKey: "title",
    header: "제목",

    meta: {
      flex: 4,
    },

    cell: ({ row }) => {
      const { id, title } = row.original;

      return (
        <div className={styles.titleWrapper}>
          <Link href={`/estimate/${id}`}>
            <strong className={styles.title}>🔒 {title}</strong>
          </Link>
        </div>
      );
    },
  },

  {
    accessorKey: "writer",
    header: "작성자",

    meta: {
      flex: 1,
      mobileHidden: true,
    },

    cell: ({ row }) => {
      const writer = row.original.writer;

      const maskedWriter = (() => {
        if (writer.length <= 1) {
          return writer;
        }

        if (writer.length === 2) {
          return `${writer[0]}*`;
        }

        return `${writer[0]}${"*".repeat(
          writer.length - 2,
        )}${writer[writer.length - 1]}`;
      })();

      return <span className={styles.writer}>{maskedWriter}</span>;
    },
  },

  {
    accessorKey: "status",
    header: "상태",

    meta: {
      flex: 1,
    },

    cell: ({ row }) => {
      const status = row.original.status;

      const statusMap = {
        WAITING: "답변대기",
        PROCESSING: "상담중",
        DONE: "답변완료",
      };

      return (
        <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>
          {statusMap[status]}
        </span>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "작성일",
    meta: {
      flex: 1,
    },

    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);

      const formatted = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      return <span className={styles.date}>{formatted}</span>;
    },
  },
];

export default function EstimateTable({
  estimates,
  totalCount,
  currentPage,
  pageSize,
}: Props) {
  const table = useReactTable<EstimatePost>({
    data: estimates,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      totalCount,
      currentPage,
      pageSize,
    } satisfies EstimateTableMeta,
  });

  return (
    <>
      <UnifiedTable table={table} />
    </>
  );
}
