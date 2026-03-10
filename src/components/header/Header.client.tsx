"use client";
import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/Image/header/logo@2x.png";
import cart from "@/assets/Image/header/cil_cart.png";
import myPage from "@/assets/Image/header/bi_person.png";
import { useRef, useState } from "react";
import { Session } from "next-auth";
import AuthIcons from "./AuthIcons.client";

const navigation = [
  { name: "전상품", href: "/products" },
  { name: "신제품", href: "/products/new" },
  { name: "베스트", href: "/products/best" },
  { name: "이벤트", href: "/events" },
  { name: "커뮤니티", href: "/community" },
  { name: "고객센터", href: "/support" },
];

type Category = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  sortOrder: number | null;
  children: Category[];
};

export default function HeaderClient({
  categories,
  session,
}: {
  categories: Category[];
  session: Session | null;
}) {
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
    <header>
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
                className={`${styles.navLink} ${idx === 0 ? styles.isFirst : ""}`}
              >
                {nav.name}
              </Link>

              {idx === 0 && (
                <div
                  className={`${styles.menu} ${openMenu ? styles.isOpen : ""}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {categories.map((cat) => (
                    <ul key={cat.id}>
                      <li className={styles.bCategory}>{cat.name}</li>
                      <div className={styles.line} />
                      {cat.children?.map((el) => (
                        <li key={el.id} className={styles.sCategory}>
                          <Link href={`/products/${cat.slug}/${el.slug}`}>
                            {el.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
