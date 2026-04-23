import { getMainCategories } from "@/lib/category";
import styles from "./Header.module.scss";
import HeaderDropdown from "./HeaderDropdown";
import Link from "next/link";
import AuthIcons from "./AuthIcons.client";
import GnbClient from "./GnbClient";
import Logo from "./Logo";
import { User, ShoppingCart, LayoutDashboard } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function HeaderServer() {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getMainCategories,
  });

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <header className={styles.headerArea}>
        <div className={styles.topHeader}>
          <Logo />

          <div className={styles.iconGroup}>
            {isAdmin && (
              <Link href="/admin/dashboard">
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

        <nav className={styles.bottomHeader}>
          <GnbClient>
            <HeaderDropdown />
          </GnbClient>
        </nav>
      </header>
    </HydrationBoundary>
  );
}
