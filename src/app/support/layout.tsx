import SupportSidebar from "./components/sidebar";
import styles from "./page.module.scss";
import { ReactNode } from "react";

export default function SupportLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.inner}>
      <SupportSidebar />

      <div>{children}</div>
    </div>
  );
}
