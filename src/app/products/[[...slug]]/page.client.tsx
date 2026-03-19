"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import CategoryTabs from "@/components/CategoryTabs/page";
import { useRouter } from "next/navigation";
import { CategoryWithChildren } from "./page";
import ProductList from "@/components/product/ProductList";
import PagenationComponent from "@/components/pagenation/page";

type Props = {
  categories: CategoryWithChildren[];
  products: any[];
  mainSlug: string;
  subSlug: string;
  total: number;
  pageSize: number;
  currentPage: number;
};

export default function PageClient({
  categories,
  mainSlug,
  subSlug,
  products,
  total,
  pageSize,
  currentPage,
}: Props) {
  const router = useRouter();
  console.log(categories);

  const currentMain = categories?.find((m) => m.slug === mainSlug);

  const tabCategories = currentMain?.children || [];

  const currentSub = tabCategories?.find((s) => s.slug === subSlug);
  const activeTabId = currentSub ? currentSub.id : "all";

  const handleTabChange = (id: number | string) => {
    if (id === "all") {
      router.push(`/products/${mainSlug}`);
    } else {
      const targetSub = tabCategories.find((cat) => cat.id === id);
      if (targetSub) {
        router.push(`/products/${mainSlug}/${targetSub.slug}`);
      }
    }
  };

  return (
    <section className={styles.inner}>
      <header>
        <div className={styles.title}>
          <h1>{currentMain?.name}</h1>

          <nav>
            <Link href="/">전상품</Link>

            <span className={styles.withSeparator} />

            <Link href={`/products/${currentMain?.slug}`}>
              {currentMain?.name}
            </Link>

            {currentSub && (
              <>
                <span className={styles.withSeparator} />
                <span>{currentSub.name}</span>
              </>
            )}
          </nav>
        </div>

        {/* 탭메뉴 */}

        <CategoryTabs
          categories={tabCategories as any}
          activeTab={activeTabId}
          onTabChange={handleTabChange}
          className={styles.customMargin}
        />
      </header>

      {/* 상품목록 */}
      <article className={styles.contentSection}>
        <h2 className={styles["sr-only"]}>상품 목록</h2>
        <ProductList products={products} className={styles.CustomMinHeight} />
      </article>

      {/* 페이지네이션 */}
      <div className={styles.pagenationWrapper}>
        <PagenationComponent
          total={total}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
}
