import { Metadata } from "next";
import EstimateNewClientPage from "./page.client";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "견적문의 작성 | 도복일번지",

  description:
    "검도복, 태권도복, 유도복, 합기도복 등 단체복 견적문의를 작성해보세요. 원하는 상품과 수량을 선택하여 빠르게 상담받을 수 있습니다.",

  keywords: [
    "견적문의 작성",
    "도복 견적문의",
    "단체복 문의",
    "검도복 견적",
    "태권도복 문의",
    "유도복 제작",
    "합기도복 단체주문",
    "도복일번지",
  ],

  openGraph: {
    title: "견적문의 작성 | 도복일번지",

    description: "단체복 · 도복 견적문의를 간편하게 작성해보세요.",

    url: "https://dobok1.com/estimate/write",

    siteName: "도복일번지",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "도복일번지 견적문의",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function EstimateNewPage() {
  return (
    <>
      <EstimateNewClientPage />
    </>
  );
}
