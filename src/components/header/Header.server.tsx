import { getFullCategories, getMainCategories } from "@/lib/category";
import styles from "./Header.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import HeaderDropdown from "./HeaderDropdown";
import cart from "@/assets/Image/header/cil_cart.png";
import myPage from "@/assets/Image/header/bi_person.png";
import Link from "next/link";
import AuthIcons from "./AuthIcons.client";
import Image from "next/image";
import GnbClient from "./GnbClient";
import Logo from "./Logo";
import { Suspense } from "react";
import login from "@/assets/Image/header/mage_login.png";

export const revalidate = 3600;

async function AuthSection() {
  const session = await getServerSession(authOptions);
  return <AuthIcons session={session} />;
}

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
            />
          </Link>

          <Suspense
            fallback={
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  opacity: 0.3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image src={login} alt="로딩중" width={24} height={24} />
              </div>
            }
          >
            <AuthSection />
          </Suspense>

          <Link href="/cart" prefetch={false}>
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
