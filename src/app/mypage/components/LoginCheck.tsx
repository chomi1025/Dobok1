import Link from "next/link";
import {
  LockKeyhole,
  Gift,
  CircleDollarSign,
  Trophy,
  UserPlus,
  LogIn,
} from "lucide-react";
import styles from "./LoginCheck.module.scss";

export default function GuestPage() {
  return (
    <div className={styles.guestWrapper}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.mainIcon}>
            <LockKeyhole size={48} strokeWidth={1.5} color="#002244" />
          </div>
          <h2>로그인이 필요한 서비스입니다.</h2>
          <p>
            도복일번지의 회원이 되시면 <br />
            주문 내역 확인 및 다양한 혜택을 누리실 수 있습니다.
          </p>
        </header>

        <section className={styles.benefits}>
          <h3>회원 전용 혜택</h3>
          <ul className={styles.benefitList}>
            <li>
              <Gift size={24} className={styles.icon} />
              <div className={styles.benefitText}>
                <strong>신규 회원 쿠폰팩</strong>
                <span>가입 즉시 드리는 특별 할인</span>
              </div>
            </li>
            <li>
              <CircleDollarSign size={24} className={styles.icon} />
              <div className={styles.benefitText}>
                <strong>결제 적립금</strong>
                <span>구매할 때마다 쌓이는 현금성 포인트</span>
              </div>
            </li>
            <li>
              <Trophy size={24} className={styles.icon} />
              <div className={styles.benefitText}>
                <strong>등급별 멤버십</strong>
                <span>구매 등급에 따른 추가 할인 혜택</span>
              </div>
            </li>
          </ul>
        </section>

        <footer className={styles.actions}>
          <Link href="/login" className={styles.loginBtn}>
            <LogIn size={18} style={{ marginRight: "8px" }} />
            로그인하기
          </Link>
          <Link href="/register" className={styles.registerBtn}>
            <UserPlus size={18} style={{ marginRight: "8px" }} />
            간편 회원가입
          </Link>
        </footer>
      </div>
    </div>
  );
}
