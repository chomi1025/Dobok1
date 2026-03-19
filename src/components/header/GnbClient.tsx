"use client";
import styles from "./Header.module.scss";
import Link from "next/link";
import { ReactNode, useRef, useState } from "react";

const navigation = [
  { name: "전상품", href: "/products" },
  { name: "신제품", href: "/products/new" },
  { name: "베스트", href: "/products/best" },
  { name: "이벤트", href: "/events" },
  { name: "커뮤니티", href: "/community" },
  { name: "고객센터", href: "/support/notice" },
];

interface HeaderClientProps {
  children: ReactNode;
}

export default function GnbClient({ children }: HeaderClientProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenMenu(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenu(false);
    }, 150);
  };

  return (
    <ul className={styles.navigation}>
      {navigation.map((nav, idx) => (
        <li
          key={nav.name}
          className={styles.list}
          onMouseEnter={idx === 0 ? handleMouseEnter : undefined}
          onMouseLeave={idx === 0 ? handleMouseLeave : undefined}
        >
          <Link
            href={idx === 0 ? "#" : nav.href}
            className={`${styles.navLink} ${idx === 0 && styles.isFirst}`}
            aria-haspopup="true"
            aria-expanded={openMenu}
          >
            {nav.name}
          </Link>

          {idx === 0 && (
            <div className={`${styles.menu} ${openMenu ? styles.isOpen : ""}`}>
              {children}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
