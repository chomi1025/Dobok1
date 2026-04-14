import styles from "./page.module.scss";

export default function TopBanner() {
  return (
    <div className={`${styles.bannerContainer} ${styles.shimmerBackground}`}>
      <div className={styles.inner}>
        <div className={styles.textContent}>
          <span className={styles.emoji}>✨</span>
          <p>
            <strong className={styles.highlight}>Grand Open!</strong>
            최고의 열정과 함께하는 시작, <span>도복일번지</span>가 드디어
            오픈했습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
