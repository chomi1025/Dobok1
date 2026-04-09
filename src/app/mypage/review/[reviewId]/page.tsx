import ReviewDetailClientPage from "./page.client";

const mockReview = {
  id: 501,
  rating: 5,
  content:
    "<p>와... 진짜 도복 재질이 미쳤어요! 🔥</p><p>품새 할 때 소리도 촥촥 잘 나고 핏이 예술입니다. 아디다스 역시 이름값 하네요. 배송도 생각보다 빨라서 좋았습니다!</p>",
  images: ["/images/sample-review.jpg"],
  createdAt: "2026-04-09T12:00:00Z",
  orderItem: {
    product: {
      name: "아디다스 프리미엄 품새도복 - 화이트",
      img: "/images/sample.jpg",
    },
    option: "170cm / 남성용",
  },
  reply: {
    id: 99,
    content:
      "안녕하세요 초미 고객님! 도복 소리가 마음에 드신다니 정말 다행입니다.🥋 열심히 수련하셔서 좋은 결과 있으시길 응원하겠습니다! 감사합니다.",
    createdAt: "2026-04-10T09:00:00Z",
  },
};

export default function ReviewDetailPage() {
  return <ReviewDetailClientPage initialReviews={mockReview} />;
}
