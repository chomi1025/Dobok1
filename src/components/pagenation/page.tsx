"use client";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.scss";

interface PaginationProps {
  total: number;
  pageSize: number;
  currentPage: number;
}

export default function SimplePagination({
  total,
  pageSize,
  currentPage,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(total / pageSize);

  const movePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: false } as any);
  };

  return (
    <nav className={styles.container}>
      <button
        onClick={() => movePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        PREV
      </button>

      <div className={styles.pages}>
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;

          return (
            <button
              key={page}
              onClick={() => movePage(page)}
              className={currentPage === page ? styles.active : ""}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => movePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        NEXT
      </button>
    </nav>
  );
}
