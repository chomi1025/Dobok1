"use client";

import Sidebar from "./components/Sidebar";
import styles from "./page.module.scss";
import GuestPage from "./components/LoginCheck";
import { useQuery } from "@tanstack/react-query";

export default function MypageClientLayout({
  session,
  children,
}: {
  session: any;
  children: React.ReactNode;
}) {
  const { data } = useQuery({
    queryKey: ["unreadCount"],
    queryFn: () => fetch("/api/messages/count").then((res) => res.json()),
    refetchInterval: 1000 * 60,
    enabled: !!session,
  });

  const unreadCount = data?.count || 0;

  // 비회원
  if (!session) {
    return (
      <div className={styles.inner}>
        <Sidebar unreadCount={0} />
        <GuestPage />
      </div>
    );
  }

  // 회원
  return (
    <div className={styles.inner}>
      <Sidebar unreadCount={unreadCount} />
      {children}
    </div>
  );
}
