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

type ResourcePost = {
  id: number;
  title: string;
  category: "DOCUMENT" | "EDUCATION" | "MEDIA" | "ETC";

  createdAt: Date | string;
  viewCount: number;
  authorNickname: string | null;
  _count?: {
    comments: number;
  };
};

type PostWithAuthor = Post & {
  author: User;
  _count?: { comments: number };
  categoryLabel: string;
  region: string;
};

interface Props {
  initialPosts: PostWithAuthor[];
  total: number;
  pageSize: number;
  currentPage: number;
}

export default function ResourcesClientPage({
  initialPosts,
  total,
  pageSize,
  currentPage,
}: Props) {
  const { data } = useQuery({
    queryKey: ["resources", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `/api/community/resources?page=${currentPage}&limit=${pageSize}`,
      );

      if (!res.ok) throw new Error("failed");

      return res.json();
    },

    initialData: currentPage === 1 ? { posts: initialPosts, total } : undefined,

    staleTime: 1000 * 60,
  });

  const displayPosts = data?.posts ?? [];

  const columns = useMemo<ColumnDef<ResourcePost>[]>(
    () => [
      {
        accessorKey: "category",
        header: "유형",
        meta: { flex: 1 },

        cell: ({ row }) => {
          const typeMap: Record<string, string> = {
            DOCUMENT: "운영자료",
            EDUCATION: "교육자료",
            MEDIA: "영상자료",
            ETC: "기타",
          };

          const type = row.original.category;

          return (
            <span className={styles.resourceType}>
              {typeMap[type] || "기타"}
            </span>
          );
        },
      },

      {
        accessorKey: "title",
        header: "제목",
        meta: { flex: 5.5 },

        cell: ({ row }) => {
          const { id, title, _count } = row.original;
          const commentCount = _count?.comments ?? 0;

          return (
            <div className={styles.titleCell}>
              <Link href={`/community/resources/${id}`}>
                <span className={styles.titleText}>{title}</span>

                {commentCount > 0 && (
                  <span className={styles.commentCount}>({commentCount})</span>
                )}
              </Link>
            </div>
          );
        },
      },

      {
        accessorKey: "authorNickname",
        header: "작성자",
        meta: { flex: 1.2 },

        cell: ({ row }) => <span>{row.original.authorNickname || "익명"}</span>,
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
        meta: { flex: 0.8 },

        cell: ({ row }) => <span>{row.original.viewCount ?? 0}</span>,
      },
    ],
    [total, currentPage, pageSize],
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
        <h1>도장 운영 자료실</h1>

        <p>
          수련 자료부터 운영 문서, 안내문 양식까지 도장 운영에 필요한 다양한
          자료를 자유롭게 공유해보세요.
        </p>

        <Button href="/community/resources/new">글쓰기</Button>
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
