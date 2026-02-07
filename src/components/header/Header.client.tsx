// src/components/Header.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/Image/header/logo@2x.png";
import cart from "@/assets/Image/header/cil_cart.png";
import myPage from "@/assets/Image/header/bi_person.png";
import * as H from "./Header.styles";
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

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [openMenu, setOpenMenu] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 메뉴 열기
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenMenu(true);
  };

  // 메뉴 닫기 (딜레이)
  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenu(false);
    }, 150); // 150ms 딜레이
  };

  return (
    <header>
      <H.TopHeader>
        <h1>
          <Link href="/">
            <Image src={logo} alt="도복일번지 로고" width={281} height={114} />
          </Link>
        </h1>

        <H.IconGroup>
          <Link href="/mypage">
            <Image
              src={myPage}
              alt="도복일번지 마이페이지"
              width={24}
              height={24}
            />
          </Link>

          {/* 로그인상태에 따라 로그아웃/로그인 아이콘 바뀜 */}
          <AuthIcons />

          <Link href="/cart">
            <Image
              src={cart}
              alt="도복일번지 장바구니"
              width={24}
              height={24}
            />
          </Link>
        </H.IconGroup>
      </H.TopHeader>

      <H.BottomHeader as="nav" style={{ position: "relative" }}>
        <H.Navigation>
          {navigation.map((nav, idx) => (
            <H.Li
              key={nav.name}
              isFirst={idx === 0}
              onMouseEnter={idx === 0 ? handleMouseEnter : undefined}
              onMouseLeave={handleMouseLeave}
            >
              <Link href={idx === 0 ? "" : nav.href} passHref legacyBehavior>
                <H.NavLink isFirst={idx === 0}>{nav.name}</H.NavLink>
              </Link>

              {/* 전상품 메뉴만 열기 */}

              {/* 항상 렌더링 */}
              {idx === 0 && (
                <H.Menu
                  isOpen={openMenu}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {categories.map((cat) => (
                    <ul key={cat.id}>
                      <H.B_category>{cat.name}</H.B_category>

                      <H.line />

                      {cat.children?.map((el) => (
                        <H.S_Category key={el.id}>
                          <Link href={`/products/${cat.slug}/${el.slug}`}>
                            {el.name}
                          </Link>
                        </H.S_Category>
                      ))}
                    </ul>
                  ))}
                </H.Menu>
              )}
            </H.Li>
          ))}
        </H.Navigation>
      </H.BottomHeader>
    </header>
  );
}
