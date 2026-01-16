import "@/styles/globals.css";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import HeaderServer from "@/components/header/Header.server"; // 혹은 Header

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <HeaderServer /> {/* 혹은 <Header /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
