"use client";
import styles from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import kakao from "@/assets/Image/footer/icon_sns_kakao (1) 1.png";
import BusinessInfo from "./BusinessInfo";

const navigation = [
  { name: "이용약관", href: "/products" },
  { name: "개인정보처리방침", href: "/products/new" },
  { name: "이용안내", href: "/products/best" },
  { name: "고객센터", href: "/support" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <nav className={styles.footer_links}>
          <ul>
            {navigation.map((nav) => (
              <li key={nav.name}>
                <Link href="/" prefetch={false}>
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.left_area}>
          <BusinessInfo>
            <address className={styles.address}>
              <p>도복일번지(롯데스포츠)</p>
              <p>대표 : 김영옥</p>
              <p>주소 : 경남 창원시 의창구 지귀로73번길 4-16(봉곡동)</p>
              <p>사업자등록번호 : 609-09-73069</p>
              <p>통신판매업신고번호 : 2000-어쩌구</p>
              <p>개인정보보호 책임자 : 임수진</p>
              <p>메일 : tkd0792@hanmail.net</p>
              <p>대표번호 : 055-265-3118</p>
            </address>
          </BusinessInfo>

          <small className={styles.small}>
            © 2025 도복일번지(롯데스포츠). All rights reserved.
          </small>
        </div>

        <div className={styles.right_Wrapper}>
          <div>
            <Link href="/" prefetch={false}>
              <Image src={kakao} alt="카카오톡 로고" width={24} height={24} />
            </Link>

            <p>도복일번지 고객센터</p>
          </div>

          <strong>055-265-3118</strong>

          <div>
            <p>주말,공휴일 휴무</p>
            <p>상담시간 : 10:00 - 18:00 (점심 12:00 - 13:00)</p>
          </div>
        </div>

        <small className={styles.mobileSmall}>
          © 2025 도복일번지(롯데스포츠). All rights reserved.
        </small>
      </div>
    </footer>
  );
}
