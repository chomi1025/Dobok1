"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import CategoryTabs from "@/components/CategoryTabs/page";
import { useRouter } from "next/navigation";
import ProductList from "@/components/product/ProductList";
import PagenationComponent from "@/components/pagenation/page";

import { useQuery } from "@tanstack/react-query";
import { CategoryWithChildren, CategoryApiResponse } from "@/types/types";
import { ChevronRight } from "lucide-react";

type Props = {
  categories: CategoryWithChildren[];
  mainSlug: string;
  subSlug: string;
  currentPage: number;
  pageSize: number;
};

export default function PageClient({
  categories,
  mainSlug,
  subSlug,
  currentPage,
  pageSize,
}: Props) {
  const router = useRouter();

  const { data } = useQuery<CategoryApiResponse>({
    queryKey: ["products", "category", mainSlug, subSlug, currentPage],
    queryFn: async () => {
      const res = await fetch(
        `/api/products/category?mainSlug=${mainSlug}&subSlug=${subSlug}&page=${currentPage}`,
      );
      return res.json();
    },
  });

  const products = data?.products || [];
  const total = data?.total || 0;

  const currentMain = categories?.find((m: any) => m.slug === mainSlug);
  const tabCategories = currentMain?.children || [];
  const currentSub = tabCategories?.find((s: any) => s.slug === subSlug);
  const activeTabId = currentSub ? currentSub.id : "all";

  const handleTabChange = (id: number | string) => {
    if (id === "all") {
      router.push(`/products/${mainSlug}`);
    } else {
      const targetSub = tabCategories.find((cat: any) => cat.id === id);
      if (targetSub) router.push(`/products/${mainSlug}/${targetSub.slug}`);
    }
  };

  return (
    <section className={styles.inner}>
      <header>
        <div className={styles.title}>
          <h1>{currentMain?.name}</h1>
          <nav>
            <Link href="/">홈</Link>
            <ChevronRight size={14} className={styles.separator} />
            <Link href={`/products/${mainSlug}`}>{currentMain?.name}</Link>
            {currentSub && (
              <>
                <ChevronRight size={14} className={styles.separator} />
                <span>{currentSub.name}</span>
              </>
            )}
          </nav>
        </div>
        <CategoryTabs
          categories={tabCategories}
          activeTab={activeTabId}
          onTabChange={handleTabChange}
          className={styles.customMargin}
        />
      </header>
      <article className={styles.contentSection}>
        <ProductList products={products} className={styles.CustomMinHeight} />
      </article>
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
