import InquiryClientPage from "./page.client";

export type InquiryType =
  | "배송문의"
  | "반품/환불"
  | "교환문의"
  | "주문/결제"
  | "상품문의"
  | "회원정보"
  | "기타";

export interface Inquiry {
  id: number;
  inquiryType: InquiryType;
  img: string;
  inquiryTitle: string;
  inquiryAt: string;
  inquiryStatus: "답변대기" | "답변완료";
}

const inquiries: Inquiry[] = Array.from({ length: 5 }, (_, i) => ({
  id: 2000 + i,
  inquiryType: i % 2 === 0 ? "배송문의" : "반품/환불",
  inquiryTitle: "목부분 소재가 어떻게되나요? 궁금합니다",
  img: "https://jbxwbgcgrqogbbwlzzdb.supabase.co/storage/v1/object/public/thumbnails/1773901449806-e05c163a-1571-4a6c-a331-ffbf713e6cf6.png",
  inquiryAt: "2025.12.15",
  inquiryStatus: i % 2 === 0 ? "답변대기" : "답변완료",
}));

export default function InquiryPage() {
  return <InquiryClientPage inquiries={inquiries} />;
}
