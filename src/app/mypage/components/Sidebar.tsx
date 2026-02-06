"use client";
import { usePathname } from "next/navigation";
import * as S from "./style";
import Link from "next/link";

const menuItems = [
  {
    title: "쇼핑정보",
    items: [
      { slug: "order", label: "주문/배송 조회" },
      { slug: "claim", label: "취소/교환/반품 조회" },
    ],
  },
  {
    title: "쇼핑활동",
    items: [
      { slug: "reviews", label: "상품후기" },
      { slug: "product-qna", label: "상품문의" },
      { slug: "inquiry", label: "1:1문의" },
    ],
  },
  {
    title: "회원정보",
    items: [
      { slug: "profile-edit", label: "회원 정보 수정" },
      { slug: "withdraw", label: "회원 탈퇴" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <S.Inner isEdit={false}>
      <h2>마이페이지</h2>

      <nav>
        {menuItems.map((section) => (
          <ul key={section.title}>
            <li className="title">{section.title}</li>

            {section.items.map((menu) => {
              const isActive = pathname.startsWith(`/mypage/${menu.slug}`);

              return (
                <li key={menu.slug} className={isActive ? "active" : ""}>
                  <Link href={`/mypage/${menu.slug}`}>{menu.label}</Link>
                </li>
              );
            })}
          </ul>
        ))}
      </nav>
    </S.Inner>
  );
}
