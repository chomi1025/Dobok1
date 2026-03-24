import { Metadata } from "next";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "이벤트 | 도복일번지",
  description: "도복일번지에서 진행하는 이벤트를 만나보세요!",
};

export default function EventPage() {
  return (
    <div className={styles.inner}>
      <h1>이벤트</h1>
      <h2>준비중</h2>
    </div>
  );
}
