"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import ProductList from "@/components/product/ProductList";
import { Category, ProductWithCategory, Title } from "../../../types/types";
import CategoryTabs from "@/components/CategoryTabs/page";
import Button from "@/components/common/buttons/page";

import useSWR from "swr";

interface Props {
  title: Title;
  categories: Category[];
  products: ProductWithCategory[];
  type: "best" | "new";
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductSectionComponent({
  title,
  categories,
  products: initialProducts,
  type,
}: Props) {
  const [activeTab, setActiveTab] = useState<number | string>("all");

  const apiUrl = type === "best" ? "/api/products/best" : "/api/products/new";

  const { data: displayProducts, isLoading } = useSWR(
    activeTab === "all" ? null : `${apiUrl}?categoryId=${activeTab}`,
    fetcher,
    { fallbackData: initialProducts },
  );

  const categoryList = Array.isArray(categories)
    ? categories
    : (categories as any).categories || [];

  return (
    <section className={styles.inner}>
      <div className={styles.title}>
        <h2>{title.name}</h2>
        <p>{title.contents}</p>
      </div>

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
