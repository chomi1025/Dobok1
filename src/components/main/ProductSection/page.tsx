"use client";

import { useState } from "react";
import styles from "./page.module.scss";

import ProductList from "@/components/product/ProductList";
import { Title } from "../../../types/types";
import CategoryTabs from "@/components/CategoryTabs/page";
import Button from "@/components/common/buttons/page";

import { fetchProductPreview } from "@/lib/api";

import { Category, Product } from "@prisma/client";

interface Props {
  title: Title;
  type: "best" | "new";
  categories: Category[];
  initialProducts: Product[];
}

export default function ProductSectionComponent({
  title,
  type,
  categories,
  initialProducts,
}: Props) {
  const [activeTab, setActiveTab] = useState<number | string>("all");

  const [products, setProducts] = useState<Product[]>(initialProducts);

  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = async (tab: number | string) => {
    setActiveTab(tab);

    setIsLoading(true);

    try {
      const data = await fetchProductPreview(type, String(tab));

      setProducts(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.inner}>
      <header className={styles.title}>
        <h2>{title.name}</h2>
        <p>{title.contents}</p>
      </header>

      <CategoryTabs
        categories={categories}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        className={styles.customMargin}
      />

      <div className={styles.productListWrapper}>
        {isLoading ? (
          <div className={styles.loading}>불러오는 중...</div>
        ) : products.length > 0 ? (
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
