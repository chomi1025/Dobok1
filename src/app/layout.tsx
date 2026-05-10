import "@/styles/globals.scss";
import { ReactNode } from "react";
import HeaderServer from "@/components/header/Header.server";
import EmotionRegistry from "@/lib/emotion-registry";
import Footer from "@/components/footer/page";
import MobileNavPage from "@/components/mobileNav/page";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";
import { Metadata } from "next";
import TopBanner from "@/components/Topbanner/page";
import Providers from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  weight: "100 900",
  display: "swap",
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

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko" className={`${pretendard.variable} `}>
      <body>
        <Providers session={session}>
          <EmotionRegistry>
            <TopBanner />
            <HeaderServer />

            <main className="main">{children}</main>

            <Toaster
              position="top-center"
              containerStyle={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 99999,
                pointerEvents: "none",
              }}
              toastOptions={{
                style: {
                  minWidth: "280px",
                  padding: "16px 24px",
                  background: "#1a1a1a",
                  color: "#fff",
                  fontWeight: "600",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  boxShadow:
                    "0 12px 24px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.2)",
                },
                success: {
                  iconTheme: {
                    primary: "#fff",
                    secondary: "#1a1a1a",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#ff4b4b",
                    secondary: "#fff",
                  },
                },
              }}
            />
            <Footer />
            <MobileNavPage />
          </EmotionRegistry>
        </Providers>
      </body>
    </html>
  );
}
