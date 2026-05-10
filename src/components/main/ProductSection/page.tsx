"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import ProductList from "@/components/product/ProductList";
import { Title } from "../../../types/types";
import CategoryTabs from "@/components/CategoryTabs/page";
import Button from "@/components/common/buttons/page";
import { useQuery } from "@tanstack/react-query";
import { fetchProductPreview } from "@/lib/api";
import { Category } from "@prisma/client";

interface Props {
  title: Title;
  type: "best" | "new";
  categories: Category[];
}

export default function ProductSectionComponent({
  title,
  type,
  categories,
}: Props) {
  const [activeTab, setActiveTab] = useState<number | string>("all");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", type, activeTab],
    queryFn: () => fetchProductPreview(type, String(activeTab)),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section className={styles.inner}>
      <header className={styles.title}>
        <h2>{title.name}</h2>
        <p>{title.contents}</p>
      </header>

      {/* 탭 */}
      <CategoryTabs
        categories={categories}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className={styles.customMargin}
      />

      {/* 상품리스트 */}
      <div key={activeTab} className={styles.productListWrapper}>
        {isLoading ? (
          <div className={styles.loading}>불러오는 중...</div>
        ) : products && products.length > 0 ? (
          <ProductList products={products} className={styles.customMinHeight} />
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
