"use client";

import styles from "./page.module.scss";
import Button from "@/components/common/buttons/page";
import { UnifiedTable } from "@/components/common/DataTable";
import { Post, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { useMemo } from "react";
import PagenationComponent from "@/components/pagenation/page";

type PostWithAuthor = Post & {
  author: User;
  _count?: { comments: number };
};

interface Props {
  initialPosts: PostWithAuthor[];
  total: number;
  pageSize: number;
  currentPage: number;
}

export default function EventsClientPage({
  initialPosts,
  total,
  pageSize,
  currentPage,
}: Props) {
  const { data } = useQuery({
    queryKey: ["posts", "EVENT", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `/api/posts?type=EVENT&page=${currentPage}&limit=${pageSize}`,
      );
      return await res.json();
    },
    initialData:
      currentPage === 1 ? { posts: initialPosts, total: total } : undefined,
    staleTime: 1000 * 60,
  });

  const displayPosts = data?.posts ?? [];

  const columns = useMemo<ColumnDef<PostWithAuthor>[]>(
  () => [
    {
      id: "number",
      header: "번호",
      meta: { flex: 0.7 },

      cell: ({ row }) => row.index + 1,
    },

    {
      accessorKey: "title",
      header: "제목",
      meta: { flex: 4.3 }, // 기존보다 조금 줄임

      cell: ({ row }) => {
        const { id, title, _count } = row.original;
        const commentCount = _count?.comments ?? 0;

        return (
          <div className={styles.titleCell}>
            <Link href={`/community/free/${id}`}>
              {title}

              {commentCount > 0 && (
                <span className={styles.commentCount}>
                  <span>({commentCount})</span>
                </span>
              )}
            </Link>
          </div>
        );
      },
    },

    {
      accessorKey: "authorId",
      header: "작성자",
      meta: { flex: 1.4 }, // 조금 넓힘

      cell: ({ row }) => {
        const authorNickname = row.original.authorNickname || "익명";
        return <span>{authorNickname}</span>;
      },
    },

    {
      accessorKey: "createdAt",
      header: "날짜",
      meta: { flex: 1 },

      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);

        return <span>{format(date, "yy.MM.dd")}</span>;
      },
    },

    {
      accessorKey: "viewCount",
      header: "조회",
      meta: { flex: 0.8 },

      cell: ({ row }) => <span>{row.original.viewCount ?? 0}</span>,
    },
  ],
  [],
);

  const table = useReactTable({
    data: displayPosts,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  return (
    <div className={styles.inner}>
      <header className={styles.header}>
        <h1>대회·행사 정보</h1>

        <p>
          전국 무도 대회와 세미나, 각종 행사 정보를 빠르게 확인하고
          참여해보세요.
        </p>
        <Button href="/community/free/new">글쓰기</Button>
      </header>

      <UnifiedTable table={table} className={styles.eventTable} />

      <PagenationComponent
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </div>
  );
}
