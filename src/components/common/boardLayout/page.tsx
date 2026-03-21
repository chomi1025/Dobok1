import Button from "../buttons/page";
import styles from "./page.module.scss";
import PagenationComponent from "@/components/pagenation/page";

interface BoardLayoutProps {
  title: string;
  tableTitle: string;
  role?: string | null;
  writeHref?: string;
  adminOnly?: boolean;
  total?: number;
  pageSize?: number;
  currentPage?: number;
  children: React.ReactNode;
}

export default function BoardLayout({
  title,
  tableTitle,
  role,
  writeHref,
  adminOnly = false,
  children,
  total,
  pageSize,
  currentPage,
}: BoardLayoutProps) {
  const showWriteButton = writeHref && (!adminOnly || role === "ADMIN");
  const showPagination =
    total !== undefined &&
    pageSize !== undefined &&
    currentPage !== undefined &&
    total > 0;

  return (
    <>
      <section className={styles.titleWrapper}>
        <h1>{title}</h1>
      </section>

      <article className={styles.mainContents}>
        {showWriteButton && (
          <Button href={writeHref} variant="primary">
            작성하기
          </Button>
        )}

        <h2>{tableTitle}</h2>

        {children}
      </article>

      {showPagination && (
        <section className={styles.pagenationWrapper}>
          <PagenationComponent
            total={total}
            pageSize={pageSize}
            currentPage={currentPage}
          />
        </section>
      )}
    </>
  );
}
