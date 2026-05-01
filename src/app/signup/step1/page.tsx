import { Metadata } from "next";
import SignupStep1ClientPage from "./page.client";

export const metadata: Metadata = {
  title: "본인인증 - 회원가입 | 도복일번지",
  description:
    "안전한 서비스 이용을 위해 본인인증을 진행해 주세요. 도복일번지는 사범님들과 관장님들을 위한 커뮤니티입니다.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "본인인증 - 회원가입 | 도복일번지",
    description: "도복일번지 가입을 위한 본인확인 단계입니다.",
    url: "https://dobok1.com/signup/step1",
    siteName: "도복일번지",
    locale: "ko_KR",
    type: "website",
  },
};

export default function SignupStep1() {
  return <SignupStep1ClientPage />;
}
