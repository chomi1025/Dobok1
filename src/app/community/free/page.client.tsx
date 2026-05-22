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
  pageSize: number;
  currentPage: number;
}

export default function FreeBoardClientPage({ pageSize, currentPage }: Props) {
  const { data } = useQuery({
    queryKey: ["posts", "FREE", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `/api/posts?type=FREE&page=${currentPage}&limit=${pageSize}`,
      );
      return res.json();
    },
    staleTime: 1000 * 60,
  });

  const total = data?.total;
  const displayPosts = data?.posts ?? [];

  const columns = useMemo<ColumnDef<PostWithAuthor>[]>(
    () => [
      {
        accessorKey: "title",
        header: "제목",
        meta: { flex: 6.2 },

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
        meta: { flex: 1.3 },

        cell: ({ row }) => {
          const authorNickname = row.original.authorNickname || "익명";

          return <span>{authorNickname}</span>;
        },
      },

      {
        accessorKey: "createdAt",
        header: "등록일",
        meta: { flex: 1 },

        cell: ({ row }) => {
          const date = new Date(row.original.createdAt);

          return <span>{format(date, "yy.MM.dd")}</span>;
        },
      },

      {
        accessorKey: "viewCount",
        header: "조회",
        meta: { flex: 0.7 },

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
        <h1>자유게시판</h1>

        <p>자유로운 소통과 유익한 정보가 가득한 커뮤니티 공간입니다.</p>
        <Button href="/community/free/new">글쓰기</Button>
      </header>

      <UnifiedTable table={table} className={styles.freeTable} />

      <PagenationComponent
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </div>
  );
}
