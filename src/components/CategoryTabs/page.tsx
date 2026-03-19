"use client";
import styles from "./page.module.scss";
import { Category } from "@/types/types";

interface CategoryTabsProps {
  categories: Category[];
  activeTab: number | string;
  onTabChange: (id: number | string) => void;
  className: string;
}

export default function CategoryTabs({
  categories,
  activeTab,
  onTabChange,
  className,
}: CategoryTabsProps) {
  return (
    <nav className={`${styles.navigation} ${className}`}>
      <ul className={styles.list}>
        <li
          className={activeTab === "all" ? styles.active : ""}
          onClick={() => onTabChange("all")}
        >
          <span>전체</span>
        </li>

        {categories?.map((cat) => (
          <li
            key={cat.id}
            className={activeTab == cat.id ? styles.active : ""}
            onClick={() => onTabChange(cat.id)}
          >
            <span>{cat.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
