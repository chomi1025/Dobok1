"use client";
import { useSession } from "next-auth/react";
import Sidebar from "./components/Sidebar";
import * as L from "./style";

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession(); // Client에서 세션 확인

  if (status === "loading") return null; // 플래시 제거

  return (
    <L.Inner>
      <Sidebar />
      {children}
    </L.Inner>
  );
}
