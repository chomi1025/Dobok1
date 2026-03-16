import { getCategories } from "@/lib/category";
import styles from "./Header.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import HeaderDropdown from "./HeaderDropdouwn";
import logo from "@/assets/Image/header/logo@2x.png";
import cart from "@/assets/Image/header/cil_cart.png";
import myPage from "@/assets/Image/header/bi_person.png";
import Link from "next/link";
import AuthIcons from "./AuthIcons.client";
import Image from "next/image";
import GnbClient from "./GnbClient";

export const revalidate = 3600;

export default async function HeaderServer() {
  const { grouped } = await getCategories();

  const session = await getServerSession(authOptions);

  return (
    <header className={styles.headerArea}>
      <div className={styles.topHeader}>
        <h1>
          <Link href="/">
            <Image
              src={logo}
              alt="도복일번지 로고"
              width={281}
              height={114}
              priority
              className={styles.logoImage}
            />
          </Link>
        </h1>

        <div className={styles.iconGroup}>
          <Link href="/mypage">
            <Image
              className={styles.iconImage}
              src={myPage}
              alt="마이페이지"
              width={24}
              height={24}
            />
          </Link>

          <AuthIcons session={session} />

          <Link href="/cart">
            <Image
              className={styles.iconImage}
              src={cart}
              alt="장바구니"
              width={24}
              height={24}
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
