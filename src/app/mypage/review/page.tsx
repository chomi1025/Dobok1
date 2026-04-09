import ReviewClientPage from "./page.client";

export interface Review {
  id: number;
  productName: string;
  img: string;
  deliveredAt: string;
  reviewStatus: "리뷰작성가능" | "리뷰작성완료";
  reviewId?: number;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 101,
    productName: "프리미엄 선수용 도복 - 화이트",
    img: "https://via.placeholder.com/90",
    deliveredAt: "2026-04-01",
    reviewStatus: "리뷰작성완료",
    reviewId: 501,
  },
  {
    id: 102,
    productName: "컴팩트 훈련용 도복 - 블루",
    img: "https://via.placeholder.com/90",
    deliveredAt: "2026-04-03",
    reviewStatus: "리뷰작성가능",
  },
  {
    id: 103,
    productName: "아디다스 품새도복 유단자용",
    img: "https://via.placeholder.com/90",
    deliveredAt: "2026-03-25",
    reviewStatus: "리뷰작성완료",
    reviewId: 502,
  },
];

export default function ReviewPage() {
  return <ReviewClientPage initialReviews={MOCK_REVIEWS} />;
}
