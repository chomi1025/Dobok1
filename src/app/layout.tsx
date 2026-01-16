import "@/styles/globals.css";

import Footer from "@/components/Footer";
import { ReactNode } from "react";
import HeaderServer from "@/components/header/Header.server";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <HeaderServer />
        {children}
        <Footer />
      </body>
    </html>
  );
}
