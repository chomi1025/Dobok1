"use client";

import { UnifiedTable } from "@/components/common/DataTable";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import styles from "./userPostsTab.module.scss";
import Link from "next/link";

interface UserPostsTabProps {
  userId: number;
  active: boolean;
}

interface UserPost {
  id: number;
  title: string;
  createdAt: string;
  viewCount: number;
  type: "FREE" | "JOB" | "EVENT" | "RESOURCE";
}

const POST_TYPE_MAP = {
  FREE: "자유게시판",
  JOB: "구인구직",
  EVENT: "이벤트",
  RESOURCE: "자료실",
};

const columnHelper = createColumnHelper<UserPost>();

export default function UserPostsTab({ userId, active }: UserPostsTabProps) {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<UserPost[]>({
    queryKey: ["admin-user-posts", userId],

    queryFn: async () => {
      const res = await fetch(`/api/admin/users/${userId}/posts`);

      if (!res.ok) {
        throw new Error("게시글 조회 실패");
      }

      return res.json();
    },

    enabled: active,

    staleTime: 1000 * 60,
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor("type", {
        header: "게시판",
        size: 120,

        cell: (info) => (
          <span className={styles.boardBadge}>
            {POST_TYPE_MAP[info.getValue()]}
          </span>
        ),
      }),

      columnHelper.accessor("title", {
        header: "제목",

        cell: (info) => (
          <Link
            href={`/community/${info.row.original.id}`}
            className={styles.titleLink}
          >
            {info.getValue()}
          </Link>
        ),
      }),

      columnHelper.accessor("viewCount", {
        header: "조회수",
        size: 100,

        cell: (info) => info.getValue().toLocaleString(),
      }),

      columnHelper.accessor("createdAt", {
        header: "작성일",
        size: 140,

        cell: (info) => new Date(info.getValue()).toLocaleDateString("ko-KR"),
      }),
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
  });

  if (!active) return null;

  if (isLoading) {
    return <div className={styles.empty}>게시글 불러오는 중...</div>;
  }

  if (isError) {
    return <div className={styles.empty}>게시글 조회 실패</div>;
  }

  if (!data.length) {
    return <div className={styles.empty}>작성한 게시글이 없습니다.</div>;
  }

  return <UnifiedTable table={table} className={styles.table} />;
}
