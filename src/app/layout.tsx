export const dynamic = "force-dynamic";
import "@/styles/globals.css";
import { ReactNode } from "react";
import HeaderServer from "@/components/header/Header.server";
import AuthProvider from "@/components/providers/AuthProvider";
import { pretendard } from "@/styles/fonts";
import EmotionRegistry from "@/lib/emotion-registry";
import Footer from "@/components/footer/page";
import MobileNavPage from "@/components/mobileNav/page";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body>
        <EmotionRegistry>
          <AuthProvider>
            <HeaderServer />
            <main>{children}</main>

            <Toaster
              position="top-center"
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
