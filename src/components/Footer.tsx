"use client";
import * as F from "./Footer.styles";
import Link from "next/link";
import Image from "next/image";
import kakao from "@/assets/Image/footer/icon_sns_kakao (1) 1.png";

const navigation = [
  { name: "이용약관", href: "/products" },
  { name: "개인정보처리방침", href: "/products/new" },
  { name: "이용안내", href: "/products/best" },
  { name: "고객센터", href: "/support" },
];

export default function Footer() {
  return (
    <F.Footer>
      <F.Inner>
        <F.Footer_links>
          <ul>
            {navigation.map((nav) => (
              <li key={nav.name}>
                <Link href="/">{nav.name}</Link>
              </li>
            ))}
          </ul>
        </F.Footer_links>

        <F.Address>
          <div>
            <p>도복일번지(롯데스포츠)</p>
            <p>대표 : 김영옥</p>
            <p>주소 : 경남 창원시 의창구 지귀로73번길 4-16(봉곡동)</p>
          </div>

          <div>
            <p>사업자등록번호 : 609-09-73069</p>
            <p>통신판매업신고번호 : 2000-어쩌구</p>
            <p>개인정보보호 책임자 : 임수진</p>
          </div>

          <div>
            <p>메일 : tkd0792@hanmail.net</p>
            <p>대표번호 : 055-265-3118</p>
          </div>
        </F.Address>

        <F.Small>© 2025 도복일번지(롯데스포츠). All rights reserved.</F.Small>

        <F.Right_Wrapper>
          <div>
            <Link href="/">
              <Image src={kakao} alt="카카오톡 로고" width={24} height={24} />
            </Link>

            <p>도복일번지 고객센터</p>
          </div>

          <strong>055-265-3118</strong>

          <div>
            <p>주말,공유일 휴무</p>
            <p>상담시간 : 10:00 - 18:00 (점심 12:00 - 13:00)</p>
          </div>
        </F.Right_Wrapper>
      </F.Inner>
    </F.Footer>
  );
}
