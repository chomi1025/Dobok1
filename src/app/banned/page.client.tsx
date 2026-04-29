"use client";

import { signOut } from "next-auth/react";
import styles from "./page.module.scss";
import { ShieldAlert } from "lucide-react"; // 아이콘 변경

export default function BannedPage() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <ShieldAlert size={42} strokeWidth={1.2} />
        </div>

        <h1 className={styles.title}>계정 이용이 제한되었습니다</h1>

        <div className={styles.description}>
          <p>커뮤니티 가이드라인 및 운영 정책 위반으로 인해</p>
          <p>
            해당 계정의 서비스 이용이 <strong>잠정적으로 정지</strong>
            되었습니다.
          </p>
        </div>

        <div className={styles.infoBox}>
          <span>문의사항은 고객센터로 연락 주시기 바랍니다.</span>
          <a href="mailto:dobok1st@gmail.com" className={styles.emailLink}>
            dobok1st@gmail.com
          </a>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.primaryBtn}
            onClick={() => (window.location.href = "mailto:dobok1st@gmail.com")}
          >
            고객센터 문의하기
          </button>
        </div>
      </div>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Dobok1. All rights reserved.
      </footer>
    </main>
  );
}
