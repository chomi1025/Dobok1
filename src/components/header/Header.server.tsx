import { getMainCategories } from "@/lib/category";
import styles from "./Header.module.scss";
import HeaderDropdown from "./HeaderDropdown";
import cart from "@/assets/Image/header/cil_cart.png";
import myPage from "@/assets/Image/header/bi_person.png";
import Link from "next/link";
import AuthIcons from "./AuthIcons.client";
import Image from "next/image";
import GnbClient from "./GnbClient";
import Logo from "./Logo";
import { User, ShoppingCart } from "lucide-react";

export const revalidate = 3600;

export default async function HeaderServer() {
  const grouped = await getMainCategories();

  return (
    <header className={styles.headerArea}>
      <div className={styles.topHeader}>
        <Logo />

        <div className={styles.iconGroup}>
          <Link href="/mypage/order" prefetch={false}>
            <User className={styles.icon} size={24} />
            <p>마이페이지</p>
          </Link>

          <AuthIcons />

          <Link href="/cart" prefetch={false}>
            <ShoppingCart className={styles.icon} size={24} />
            <p>장바구니</p>
          </Link>
        </div>
      </div>

      <nav className={styles.bottomHeader}>
        <GnbClient>
          <HeaderDropdown categories={grouped} />
        </GnbClient>
      </nav>
    </header>
  );
}
