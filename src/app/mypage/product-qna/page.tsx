import ProductQnaClientPage from "./page.client";

export interface Qna {
  id: number;
  productName: string;
  img: string;
  qnaTitle: string;
  qnaAt: string;
  qnaStatus: "답변대기" | "답변완료";
}

const qnas: Qna[] = Array.from({ length: 5 }, (_, i) => ({
  id: 2000 + i,
  productName: `아디다스 품새도복(여) 유단자용 ${i + 1}`,
  qnaTitle: "목부분 소재가 어떻게되나요? 궁금합니다",
  img: "/sample.png",
  qnaAt: "2025.12.15",
  qnaStatus: i % 2 === 0 ? "답변대기" : "답변완료",
}));

export default function ProductQnaPage() {
  return <ProductQnaClientPage qnas={qnas} />;
}
