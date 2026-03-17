"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import ProductList from "@/components/product/ProductList";
import { Category } from "../../../types/types";
import { ProductClientProps } from "./page";
import CategoryTabs from "@/components/CategoryTabs/page";

export default function ProductSectionClientComponent({
  title,
  categories,
  products = [],
}: ProductClientProps) {
  const [activeTab, setActiveTab] = useState<number | string>("all");

  const categoryList = Array.isArray(categories)
    ? categories
    : (categories as any).categories || [];

  const filteredProducts = products.filter((p) => {
    if (activeTab === "all") return true;

    const productCategory = categories
      .flatMap((cat) => cat.children || [])
      .find((child) => child.id === p.categoryId);

    if (!productCategory) return false;

    return productCategory.parentId === activeTab;
  });

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

      <button className={styles.moreBtn}>
        {title.button} <span>→</span>
      </button>
    </section>
  );
}
