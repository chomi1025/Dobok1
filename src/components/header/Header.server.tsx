import { getMainCategories } from "@/lib/category";
import styles from "./Header.module.scss";
import HeaderDropdown from "./HeaderDropdown";
import Link from "next/link";
import AuthIcons from "./AuthIcons.client";
import GnbClient from "./GnbClient";
import Logo from "./Logo";
import { User, ShoppingCart, LayoutDashboard } from "lucide-react";
import { Session } from "next-auth";
import HeaderScrollWrapper from "./HeaderScrollWrapper";

interface Props {
  session: Session | null;
}

export default async function HeaderServer({ session }: Props) {
  const categories = await getMainCategories();

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <header className={styles.headerArea}>
      <HeaderScrollWrapper>
        <div className={styles.topHeader}>
          <Logo />

          <div className={styles.iconGroup}>
            {isAdmin && (
              <Link href="/admin/dashboard" prefetch={false}>
                <LayoutDashboard size={24} color="#333" />
                <p style={{ color: "#333" }}>관리자</p>
              </Link>
            )}

            <Link href="/mypage/order" prefetch={false}>
              <User className={styles.icon} size={24} />
              <p>마이페이지</p>
            </Link>

            <AuthIcons session={session} />

            <Link href="/cart" prefetch={false}>
              <ShoppingCart className={styles.icon} size={24} />
              <p>장바구니</p>
            </Link>
          </div>
        </div>
      </HeaderScrollWrapper>

      <nav className={styles.bottomHeader}>
        <GnbClient>
          <HeaderDropdown categories={categories} />
        </GnbClient>
      </nav>
    </header>
  );
}
