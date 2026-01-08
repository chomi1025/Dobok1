// src/components/Header.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/Image/header/logo@2x.png";
import login from "@/assets/Image/header/mage_login.png";
import cart from "@/assets/Image/header/cil_cart.png";
import search from "@/assets/Image/header/si_search-line.png";
import * as H from "./Header.styles";
import { useRef, useState } from "react";

const navigation = [
  { name: "전상품", href: "/products" },
  { name: "신제품", href: "/products/new" },
  { name: "베스트", href: "/products/best" },
  { name: "이벤트", href: "/events" },
  { name: "커뮤니티", href: "/community" },
  { name: "고객센터", href: "/support" },
];

const category = [
  {
    name: "도복·띠",
    href: "/products/ttibok/taekwondo", // 첫 서브카테고리로 이동
    subMenu: [
      { name: "태권도복", href: "/products/ttibok/taekwondo" },
      { name: "합기도복", href: "/products/ttibok/hapkido" },
      { name: "유도복", href: "/products/ttibok/judo" },
      { name: "검도복", href: "/products/ttibok/kendo" },
      { name: "띠", href: "/products/ttibok/belt" },
    ],
  },
  {
    name: "보호장비",
    href: "/products/protection/headgear", // 첫 서브카테고리로 이동
    subMenu: [
      { name: "머리 보호대", href: "/products/protection/headgear" },
      { name: "몸통 보호대", href: "/products/protection/body" },
      { name: "팔·다리 보호대", href: "/products/protection/limbs" },
      { name: "글러브", href: "/products/protection/gloves" },
      { name: "아대", href: "/products/protection/band" },
      { name: "마우스피스", href: "/products/protection/mouthpiece" },
    ],
  },
  {
    name: "훈련·격파용품",
    href: "/products/training/mit-shield",
    subMenu: [
      { name: "미트·쉴드", href: "/products/training/mit-shield" },
      { name: "샌드백·사각백", href: "/products/training/sandbag-square" },
      { name: "송판류", href: "/products/training/wood-board" },
      { name: "쌍절곤", href: "/products/training/nunchaku" },
      { name: "줄넘기", href: "/products/training/jump-rope" },
    ],
  },
  {
    name: "도장설비",
    href: "/products/studio/mattress-pit",
    subMenu: [
      { name: "매트리스·뜀틀", href: "/products/studio/mattress-pit" },
      { name: "에어매트", href: "/products/studio/air-mat" },
      { name: "퍼즐매트·롤매트", href: "/products/studio/puzzle-roll-mat" },
    ],
  },
  {
    name: "부가용품",
    href: "/products/accessories/shoes",
    subMenu: [
      { name: "신발·실내화", href: "/products/accessories/shoes" },
      { name: "상장·트로피", href: "/products/accessories/trophy" },
      {
        name: "도장 문구류·소모품",
        href: "/products/accessories/stationery",
      },
    ],
  },
];

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

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
          <button onClick={openSearch}>
            <Image src={search} alt="도복일번지 검색" width={24} height={24} />
          </button>

          <Link href="/login">
            <Image src={login} alt="도복일번지 로그인" width={24} height={24} />
          </Link>

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
              <Link href={nav.href} passHref legacyBehavior>
                <H.NavLink isFirst={idx === 0}>{nav.name}</H.NavLink>
              </Link>

              {/* 전상품 메뉴만 열기 */}
              {openMenu && idx === 0 && (
                <H.Menu>
                  {category.map((cat) => (
                    <ul key={cat.name}>
                      <H.B_category>{cat.name}</H.B_category>
                      <H.line />
                      {cat.subMenu.map((el) => (
                        <H.S_Category key={el.name}>
                          <Link href={el.href}>{el.name}</Link>
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
