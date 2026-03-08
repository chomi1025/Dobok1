"use client";
import Link from "next/link";
import * as S from "./style";
import { useSelectedLayoutSegment } from "next/navigation";

const menuItems = [
  { slug: "notice", label: "공지사항" },
  { slug: "faq", label: "FAQ" },
  { slug: "shipping", label: "주문/배송 안내" },
  { slug: "return", label: "교환/반품/환불 안내" },
  { slug: "inquiry", label: "1:1문의하기" },
];

export default function SupportSidebar() {
  const segment = useSelectedLayoutSegment();

  return (
    <S.Inner>
      <h2> 고객센터</h2>

      <S.Navigation>
        <ul>
          {menuItems.map((menu) => (
            <S.List key={menu.slug} active={segment === menu.slug}>
              <Link href={`/support/${menu.slug}`}>{menu.label}</Link>
            </S.List>
          ))}
        </ul>
      </S.Navigation>
    </S.Inner>
  );
}
