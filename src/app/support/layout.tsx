"use client";
import SupportSidebar from "./components/sidebar";
import * as S from "./style";
import { ReactNode } from "react";

export default function SupportLayout({ children }: { children: ReactNode }) {
  return (
    <S.Inner>
      <SupportSidebar />
      {children}
    </S.Inner>
  );
}
