import "@/styles/globals.scss";
import { ReactNode } from "react";
import HeaderServer from "@/components/header/Header.server";
import EmotionRegistry from "@/lib/emotion-registry";
import Footer from "@/components/footer/page";
import MobileNavPage from "@/components/mobileNav/page";
import localFont from "next/font/local";
import { Metadata } from "next";
import TopBanner from "@/components/Topbanner/page";
import Providers from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import dynamic from "next/dynamic";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Light.subset.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "도복일번지",
  description: "최고의 무술 용품 쇼핑몰",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

const ToastProvider = dynamic(
  () => import("@/components/common/ToastProvider"),
  { ssr: false },
);

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko">
      <body className={`${pretendard.variable} `}>
        <Providers session={session}>
          <EmotionRegistry>
            <TopBanner />

            {/* 헤더 */}
            <HeaderServer session={session} />

            {/* 메인 */}
            <main className="main">{children}</main>

            {/* 토스터 */}
            <ToastProvider />

            {/* 푸터 */}
            <Footer />
            <MobileNavPage />
          </EmotionRegistry>
        </Providers>
      </body>
    </html>
  );
}
