"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import ProductList from "@/components/product/ProductList";
import { Category, ProductWithCategory, Title } from "../../../types/types";
import CategoryTabs from "@/components/CategoryTabs/page";
import Button from "@/components/common/buttons/page";

import useSWR from "swr";
import { useQuery } from "@tanstack/react-query";

interface Props {
  title: Title;
  categories: Category[];
  products: ProductWithCategory[];
  type: "best" | "new";
}

export default function ProductSectionComponent({
  title,
  categories,
  products: initialProducts,
  type,
}: Props) {
  const [activeTab, setActiveTab] = useState<number | string>("all");

  const { data: displayProducts, isLoading } = useQuery({
    queryKey: ["products", type, activeTab],
    queryFn: async () => {
      const params = new URLSearchParams({
        type,
        categoryId: String(activeTab),
      });
      const res = await fetch(`/api/products/preview?${params}`);
      if (!res.ok) throw new Error("fetch 실패");
      return res.json();
    },

    placeholderData: activeTab === "all" ? initialProducts : undefined,
    staleTime: 0,
  });

  const categoryList = Array.isArray(categories)
    ? categories
    : (categories as any).categories || [];

  return (
    <section className={styles.inner}>
      <header className={styles.title}>
        <h2>{title.name}</h2>
        <p>{title.contents}</p>
      </header>

      {/* 탭 */}
      <CategoryTabs
        categories={categoryList}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className={styles.customMargin}
      />

      {/* 상품리스트 */}
      <div key={activeTab} className={styles.productListWrapper}>
        {isLoading ? (
          <div className={styles.loading}>불러오는 중...</div>
        ) : displayProducts && displayProducts.length > 0 ? (
          <ProductList
            products={displayProducts}
            className={styles.customMinHeight}
          />
        ) : (
          <div className={styles.noItem}>새로운 상품을 준비 중입니다.</div>
        )}
      </div>

      <Button variant="edit" href={title.href}>
        {title.button}
      </Button>
    </section>
  );
}
