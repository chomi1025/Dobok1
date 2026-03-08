// src/styles/fonts.ts
import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    { path: "../../public/fonts/Pretendard-Light.subset.woff2", weight: "300" },
    {
      path: "../../public/fonts/Pretendard-Regular.subset.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.subset.woff2",
      weight: "500",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.subset.woff2",
      weight: "600",
    },
    { path: "../../public/fonts/Pretendard-Bold.subset.woff2", weight: "700" },
    {
      path: "../../public/fonts/Pretendard-ExtraBold.subset.woff2",
      weight: "800",
    },
  ],
  variable: "--font-pretendard", // CSS 변수로 활용 가능
  display: "swap", // 폰트 로딩 중에도 텍스트를 보여줘서 LCP 방어!
});
