"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import ProductList from "@/components/product/ProductList";
import { Category, Product } from "../../../types/types";
import CategoryTabs from "@/components/CategoryTabs/page";
import { Session } from "next-auth";

export interface ProductWithCategory extends Product {
  category: {
    id: number;
    name: string;
    slug: string;
    parentId: number | null;
    parent?: {
      id: number;
      name: string;
      slug: string;
    } | null;
  };
}

interface CustomProductClientProps {
  session: Session | null;
  title: {
    name: string;
    contents: string;
    button: string;
  };
  categories: Category[];
  products: ProductWithCategory[];
}

export default function ProductSectionClientComponent({
  session,
  title,
  categories,
  products = [],
}: CustomProductClientProps) {
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
            session={session}
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
