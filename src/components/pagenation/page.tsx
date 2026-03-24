"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(total / pageSize);

  const PAGE_GROUP_SIZE = 5;
  const currentGroup = Math.ceil(currentPage / PAGE_GROUP_SIZE);
  const startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const movePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false } as any);
  };

  return (
    <nav className={styles.inner}>
      <button onClick={() => movePage(1)} disabled={currentPage === 1}>
        {"<<"}
      </button>
      <button
        onClick={() => movePage(currentPage - 1)}
        disabled={currentPage === 1 || total === 0}
      >
        PREV
      </button>

      <div className={styles.pages}>
        {total === 0 ? (
          <button className={styles.active} disabled>
            1
          </button>
        ) : (
          pages.map((page) => (
            <button
              key={page}
              onClick={() => movePage(page)}
              className={currentPage === page ? styles.active : ""}
            >
              {page}
            </button>
          ))
        )}
      </div>

      <button
        onClick={() => movePage(currentPage + 1)}
        disabled={currentPage === totalPages || total === 0}
      >
        NEXT
      </button>

      <button
        onClick={() => movePage(totalPages)}
        disabled={currentPage === totalPages || total === 0}
      >
        {">>"}
      </button>
    </nav>
  );
}
