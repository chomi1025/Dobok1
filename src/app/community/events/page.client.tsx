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
import { CITY_OPTIONS } from "@/constants/regions";

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
        accessorKey: "category",
        header: "유형",
        meta: { flex: 1 },

        cell: ({ row }) => {
          const category = row.original.categoryLabel || "대회";

          return <span className={styles.categoryBadge}>{category}</span>;
        },
      },

      {
        accessorKey: "title",
        header: "제목",
        meta: { flex: 5.5 },

        cell: ({ row }) => {
          const { id, title, _count, city, district, eventDate } = row.original;

          const commentCount = _count?.comments ?? 0;

          const cityLabel =
            CITY_OPTIONS.find((v) => v.value === city)?.label || city;

          return (
            <div className={styles.titleCell}>
              <Link
                href={`/community/events/${id}`}
                className={styles.titleLink}
              >
                <div className={styles.titleTop}>
                  <span className={styles.titleText}>{title}</span>

                  {commentCount > 0 && (
                    <span className={styles.commentCount}>
                      ({commentCount})
                    </span>
                  )}
                </div>

                <div className={styles.meta}>
                  {eventDate && (
                    <>
                      <span>
                        개최일 : {format(new Date(eventDate), "yy.MM.dd")}
                      </span>

                      <span>/</span>
                    </>
                  )}

                  <span>
                    행사지역 : {cityLabel} {district}
                  </span>
                </div>
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

        cell: ({ row }) => (
          <span>{format(new Date(row.original.createdAt), "yy.MM.dd")}</span>
        ),
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
        <Button href="/community/events/new">글쓰기</Button>
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
