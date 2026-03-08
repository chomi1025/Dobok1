export const dynamic = "force-dynamic";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import HeaderServer from "@/components/header/Header.server"; // 혹은 Header
import AuthProvider from "@/components/providers/AuthProvider";
import { pretendard } from "@/styles/fonts";
import EmotionRegistry from "@/lib/emotion-registry";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body>
        <EmotionRegistry>
          <AuthProvider>
            <HeaderServer />
            {/* 혹은 <Header /> */}
            {children}
            <Footer />
          </AuthProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}
