import { prisma } from "@/lib/prisma";
import ProductSectionClientComponent from "../ProductSection/page";

export const MOCK_PRODUCTS = [
  {
    id: 1,
    categoryId: 1,
    name: "프리미엄 골드 에디션 유도복",
    price: 189000,
    discount: 10,
    img: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=500",
    isBest: true,
    tag: "NEW",
  },
  {
    id: 2,
    categoryId: 1,
    name: "국가대표 공인 선수용 도복",
    price: 210000,
    discount: 0,
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500",
    isBest: true,
    tag: "BEST",
  },
  {
    id: 3,
    categoryId: 2,
    name: "자수 장인 블랙벨트 (고급형)",
    price: 45000,
    discount: 5,
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=500",
    isBest: false,
    tag: "",
  },
  {
    id: 4,
    categoryId: 3,
    name: "충격 흡수 무릎 보호대 세트",
    price: 32000,
    discount: 15,
    img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=500",
    isBest: true,
    tag: "SALE",
  },
  {
    id: 5,
    categoryId: 1,
    name: "경량 스파링 도복 화이트",
    price: 125000,
    discount: 0,
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=500",
    isBest: false,
    tag: "",
  },
  {
    id: 6,
    categoryId: 2,
    name: "심사 통과용 면 띠 (청색/적색)",
    price: 12000,
    discount: 0,
    img: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=500",
    isBest: false,
    tag: "",
  },
  {
    id: 7,
    categoryId: 3,
    name: "통기성 우수한 팔꿈치 보호대",
    price: 28000,
    discount: 0,
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=500",
    isBest: true,
    tag: "HOT",
  },
  {
    id: 8,
    categoryId: 1,
    name: "주짓수 전용 하이브리드 도복",
    price: 158000,
    discount: 20,
    img: "https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=500",
    isBest: true,
    tag: "LIMITED",
  },
];

const title = {
  name: "베스트 상품",
  contents: "도복일번지의 베스트 상품을 모아왔어요",
  button: "베스트 더보기",
};

export default async function BestSectionComponent() {
  const mainCategory = await prisma.category.findMany({
    where: {
      parentId: null,
    },
    orderBy: {
      id: "asc",
    },
  });

  return (
    <>
      <ProductSectionClientComponent
        categories={mainCategory}
        title={title}
        products={MOCK_PRODUCTS}
      />
    </>
  );
}
