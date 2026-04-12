"use client";
import BreadCrumb from "@/components/breadcrumb";
import styles from "./page.module.scss";

const STEPS = [
  { label: "장바구니", step: 0, path: "/cart" },
  { label: "주문서작성/결제", step: 1, path: "/checkout" },
  { label: "주문완료", step: 2, path: "/order/success" },
];

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.inner}>
      <header className={styles.sectionHeader}>
        <h1>장바구니</h1>
        <BreadCrumb steps={STEPS} />
      </header>

      {children}
    </div>
  );
}
