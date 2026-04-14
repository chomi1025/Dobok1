"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hideUntil = localStorage.getItem("hideTopBanner");
    const now = new Date().getTime();

    if (!hideUntil || now > parseInt(hideUntil)) {
      setIsVisible(true);
    }
  }, []);

  // 오늘 하루 보지 않기
  const handleHideForDay = () => {
    const tomorrow = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem("hideTopBanner", tomorrow.toString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.inner}>
        <div className={styles.textContent}>
          <span className={styles.emoji}>✨</span>
          <p>
            <strong className={styles.highlight}>Grand Open!</strong>
            최고의 열정과 함께하는 시작, <span>도복일번지</span>가 드디어
            오픈했습니다.
          </p>
        </div>

        <div className={styles.actionGroup}>
          <button className={styles.dayClose} onClick={handleHideForDay}>
            오늘 하루 보지 않기
          </button>
          <button
            className={styles.closeButton}
            onClick={() => setIsVisible(false)}
          >
            <span className={styles.closeIcon}>✕</span>
          </button>
        </div>
      </div>
    </div>
  );
}
