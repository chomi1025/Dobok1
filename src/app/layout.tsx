import "@/styles/globals.scss";
import { ReactNode } from "react";
import HeaderServer from "@/components/header/Header.server";
import AuthProvider from "@/components/providers/AuthProvider";
import EmotionRegistry from "@/lib/emotion-registry";
import Footer from "@/components/footer/page";
import MobileNavPage from "@/components/mobileNav/page";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";
import { Metadata } from "next";
import TopBanner from "@/components/Topbanner/page";

const AppleSDGothicNeo = localFont({
  src: [
    {
      path: "../../public/fonts/AppleSDGothicNeo-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-AppleSDGothicNeo",
});

const paybooc = localFont({
  src: [
    {
      path: "../../public/fonts/paybooc-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-paybooc",
  display: "swap",
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
  return (
    <html
      lang="ko"
      className={`${AppleSDGothicNeo.variable} ${paybooc.variable}`}
    >
      <body className={AppleSDGothicNeo.className}>
        <EmotionRegistry>
          <AuthProvider>
            <TopBanner />
            <HeaderServer />

            <main className="main">{children}</main>

            <Toaster
              position="top-center"
              containerStyle={{
                zIndex: 99999,
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
          </AuthProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}
