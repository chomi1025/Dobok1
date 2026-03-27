"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import ProductList from "@/components/product/ProductList";
import { ProductWithCategory, Title } from "../../../types/types";
import CategoryTabs from "@/components/CategoryTabs/page";
import { Session } from "next-auth";
import Button from "@/components/common/buttons/page";
import { CategoryBase } from "@/lib/category";

interface Props {
  title: Title;
  categories: CategoryBase[];
  products: ProductWithCategory[];
}

export default function ProductSectionComponent({
  title,
  categories,
  products = [],
}: Props) {
  const [activeTab, setActiveTab] = useState<number | string>("all");

  const categoryList = Array.isArray(categories)
    ? categories
    : (categories as any).categories || [];

  const filteredProducts = products
    .filter((p) => {
      if (activeTab === "all") return true;

      return p.category?.parent?.id === activeTab;
    })
    .slice(0, 8);

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
        {filteredProducts.length > 0 ? (
          <ProductList
            products={filteredProducts}
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
