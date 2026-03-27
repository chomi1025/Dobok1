"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/Image/header/logo@2x.png";
import styles from "./Header.module.scss";

export default function Logo() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const Tag = isHome ? "h1" : "div";

  return (
    <Tag className={styles.logoWrapper}>
      <Link href="/" prefetch={false}>
        <Image
          src={logo}
          alt="도복일번지 로고"
          width={281}
          height={114}
          priority
          className={styles.logoImage}
        />
      </Link>
    </Tag>
  );
}
