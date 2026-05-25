import React from "react";
import styles from "./page.module.scss";

export default function EstimatePage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className={styles.heroSection}>
        <div>
          <span className={styles.label}>ESTIMATE</span>

          <h1>단체복 견적문의</h1>

          <p>
            체육관 · 학교 · 동아리 · 단체 주문까지
            <br />
            빠르고 친절하게 상담해드립니다.
          </p>
        </div>
      </section>

      {children}
    </>
  );
}
