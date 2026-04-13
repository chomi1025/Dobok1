"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.scss";

const menuItems = [
  { slug: "dashboard", label: "대시보드" },
  { slug: "orders", label: "주문 관리" },
  { slug: "products", label: "상품 관리" },
  { slug: "categories", label: "카테고리 관리" },
  { slug: "users", label: "회원관리 " },
];

export default function AdminSidebar() {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className={styles.inner} aria-label="관리자 메뉴">
      <header>
        <h1>관리자 페이지</h1>
      </header>

      <ul className={styles.navigation}>
        {menuItems.map((menu) => (
          <li
            className={`${styles.list} ${segment === menu.slug && styles.active}`}
            key={menu.slug}
          >
            <Link href={`/admin/${menu.slug}`}>{menu.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
