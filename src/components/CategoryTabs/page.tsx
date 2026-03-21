"use client";
import styles from "./page.module.scss";

interface CategoryTabsProps {
  categories: { id: number | string; name: string }[];
  activeTab: number | string;
  onTabChange: (id: number | string) => void;
  className?: string;
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
          <button
            className={`${styles.catBtn} ${activeTab === "all" ? styles.active : ""}`}
          >
            전체
          </button>
        </li>

        {categories?.map((cat) => (
          <li
            key={cat.id}
            className={activeTab == cat.id ? styles.active : ""}
            onClick={() => onTabChange(cat.id)}
          >
            <button
              className={`${styles.catBtn} ${activeTab == cat.id ? styles.active : ""}`}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
