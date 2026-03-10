import styles from "./mobileNav.module.scss";

export default function MobileNavPage() {
  return (
    <nav className={styles.navigation}>
      <ul>
        <li>메뉴</li>
        <li>홈</li>
        <li>검색</li>
      </ul>
    </nav>
  );
}
