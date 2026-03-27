"use client";

import { useState } from "react";
import styles from "./Footer.module.scss";

export default function BusinessInfo({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.business_info}>
      <button
        type="button"
        className={styles.toggle_btn}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        도복일번지 사업자 정보
        <span className={`${styles.arrow} ${isOpen ? styles.up : ""}`}>▾</span>
      </button>

      <div className={`${styles.address_content} ${isOpen ? styles.open : ""}`}>
        {children}
      </div>
    </div>
  );
}
