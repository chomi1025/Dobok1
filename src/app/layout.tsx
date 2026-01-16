import "@/styles/globals.css";
<<<<<<< HEAD

import Footer from "@/components/Footer";
import { ReactNode } from "react";
import HeaderServer from "@/components/header/Header.server";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
=======
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
>>>>>>> 83a61c5 (헤더)
}) {
  return (
    <html lang="ko">
      <body>
<<<<<<< HEAD
        <HeaderServer />
=======
        <Header />
>>>>>>> 83a61c5 (헤더)
        {children}
        <Footer />
      </body>
    </html>
  );
}
