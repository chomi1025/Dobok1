export const dynamic = "force-dynamic";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import HeaderServer from "@/components/header/Header.server"; // 혹은 Header
import AuthProvider from "@/components/providers/AuthProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <HeaderServer /> {/* 혹은 <Header /> */}
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
