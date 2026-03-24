import CommunitySidebar from "./components/sidebar";
import styles from "./page.module.scss";
import { ReactNode } from "react";

export default function CommunityLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.inner}>
      <CommunitySidebar />

      <div>{children}</div>
    </div>
  );
}
