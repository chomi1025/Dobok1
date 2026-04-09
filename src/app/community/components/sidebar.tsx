"use client";
import Link from "next/link";
import styles from "./sidebar.module.scss";
import { useSelectedLayoutSegment } from "next/navigation";

const menuItems = [
  { slug: "jobs", label: "구인·구직게시판" },
  { slug: "free", label: "자유게시판" },
  { slug: "events", label: "대회·행사정보" },
  { slug: "resources", label: "도장 운영 자료실" },
];

export default function CommunitySidebar() {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className={styles.inner} aria-label="커뮤니티 메뉴">
      <header>
        <h1>커뮤니티</h1>
      </header>

      <ul className={styles.navigation}>
        {menuItems.map((menu) => (
          <li
            className={`${styles.list} ${segment === menu.slug && styles.active}`}
            key={menu.slug}
          >
            <Link href={`/community/${menu.slug}`} prefetch={false}>
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
