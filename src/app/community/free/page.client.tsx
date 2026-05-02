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

export default function FreeBoardClientPage({
  initialPosts,
  total,
  pageSize,
  currentPage,
}: Props) {
  const { data } = useQuery({
    queryKey: ["posts", "FREE", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `/api/posts?type=FREE&page=${currentPage}&limit=${pageSize}`,
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
        size: 80,
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "title",
        header: "제목",
        size: 478,
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
        size: 130,
        cell: ({ row }) => {
          const authorNickname = row.original.authorNickname || "익명";
          return <span>{authorNickname}</span>;
        },
      },
      {
        accessorKey: "createdAt",
        header: "날짜",
        size: 110,
        cell: ({ row }) => {
          const date = new Date(row.original.createdAt);

          return <span>{format(date, "yy.MM.dd")}</span>;
        },
      },
      {
        accessorKey: "viewCount",
        header: "조회",
        size: 110,
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

        <p>자유로운 소통과 유익한 정보가 가득한 커뮤니티 공간입니다</p>
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
