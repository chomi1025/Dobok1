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

export const revalidate = 3600;

export default async function HeaderServer() {
  const grouped = await getMainCategories();

  return (
    <header className={styles.headerArea}>
      <div className={styles.topHeader}>
        <Logo />

        <div className={styles.iconGroup}>
          <Link href="/mypage/order" prefetch={false}>
            <Image
              className={styles.iconImage}
              src={myPage}
              alt="마이페이지"
              width={24}
              height={24}
              priority
            />
          </Link>

          <AuthIcons />

          <Link href="/cart" prefetch={false}>
            <Image
              className={styles.iconImage}
              src={cart}
              alt="장바구니"
              width={24}
              height={24}
              priority
            />
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
