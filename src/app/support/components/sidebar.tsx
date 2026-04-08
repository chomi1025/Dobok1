"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { useSelectedLayoutSegment } from "next/navigation";

const menuItems = [
  { slug: "notice", label: "공지사항" },
  { slug: "faq", label: "FAQ" },
  { slug: "shipping", label: "주문/배송 안내" },
  { slug: "return", label: "교환/반품/환불 안내" },
  { slug: "inquiry", label: "1:1문의하기" },
];

export default function SupportSidebar() {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className={styles.inner} aria-label="고객센터 메뉴">
      <header>
        <h1> 고객센터</h1>
      </header>

      <ul className={styles.navigation}>
        {menuItems.map((menu) => (
          <li
            className={`${styles.list} ${segment === menu.slug && styles.active}`}
            key={menu.slug}
          >
            <Link href={`/support/${menu.slug}`} prefetch={false}>
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
