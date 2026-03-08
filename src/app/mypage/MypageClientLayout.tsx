// src/app/mypage/MypageClientLayout.tsx
"use client";

import Sidebar from "./components/Sidebar";
import * as L from "./style";

export default function MypageClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <L.Inner>
      <Sidebar />
      {children}
    </L.Inner>
  );
}
