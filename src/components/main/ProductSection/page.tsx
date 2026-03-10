"use client";
import { useState } from "react";
import styles from "./ProductSection.module.scss";
import Image from "next/image";

interface CatProps {
  categories: { id: number; name: string; slug: string | null }[];
  products: {
    id: number;
    name: string;
    categoryId: number;
    price: number;
    discount: number;
    img: string;
    isBest: boolean;
    tag: string;
  };
  title: {
    name: string;
    contents: string;
  };
}

export default function ProductSectionClientComponent({
  title,
  categories,
  products,
}: CatProps) {
  const [activeTab, setActiveTab] = useState<number | string>("all");

  return (
    <section className={styles.inner}>
      <div className={styles.title}>
        <h2>{title.name}</h2>
        <p>{title.contents}</p>
      </div>

      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li
            className={activeTab === "all" ? styles.active : ""}
            onClick={() => setActiveTab("all")}
          >
            <span>전체</span>
          </li>

          {categories?.map((cat) => (
            <li
              key={cat.id}
              className={activeTab === cat.id ? styles.active : ""}
              onClick={() => setActiveTab(cat.id)}
            >
              <span>{cat.name}</span>
            </li>
          ))}
        </ul>
      </nav>

      <ul className={styles.productList}>
        {products?.map((prd) => (
          <li>
            <figure>
              <Image alt={prd.name} src={prd.img} fill />
              <span>장</span>
            </figure>

            <div>
              <p>{prd.name}</p>

              <strong>
                <span>{prd.price.toLocaleString()}</span> 원
              </strong>

              {prd.sale ? <small>{}</small> : ""}
            </div>
          </li>
        ))}
      </ul>

      <button className={styles.moreBtn}>
        {title.button} <span>→</span>
      </button>
    </section>
  );
}
