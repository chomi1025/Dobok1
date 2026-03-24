"use client";

import { useState } from "react";
import { SHOPPING_POLICY } from "@/constants/policy";
import ProductInfo from "./ProductInfo";
import DetailSection from "./DetailSection";
import ReviewSection from "./ReviewSection";
import { Product } from "@/types/types";
import { Session } from "next-auth";

interface Prop {
  product: Product;
  session: Session | null;
}

interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  images: string[];
  createdAt: string;
  option: string;
}

export const mockReviews: Review[] = [];

export default function ProductDetailClientPage({ product, session }: Prop) {
  const [addedOptions, setAddedOptions] = useState<any[]>([]);
  console.log(product);

  // 상품정보 고시
  const policy = SHOPPING_POLICY.map((policy) => {
    if (policy.title === "상품 정보 고시") {
      return {
        ...policy,
        items: policy.items.map((item) => {
          switch (item.label) {
            case "제품명":
              return { ...item, content: [product.name] };
            case "제품소재":
              return {
                ...item,
                content: [product.material || "상세페이지 참조"],
              };
            case "색상":
              const colors = Array.from(
                new Set(product.options.map((o) => o.color).filter(Boolean)),
              );
              return {
                ...item,
                content:
                  colors.length > 0 ? [colors.join(", ")] : ["단일 색상"],
              };
            case "치수":
              const sizes = Array.from(
                new Set(product.options.map((o) => o.size).filter(Boolean)),
              );
              return {
                ...item,
                content:
                  sizes.length > 0 ? [sizes.join(", ")] : ["상세페이지 참조"],
              };
            case "제조국":
              return {
                ...item,
                content: [product.origin || "한국"],
              };
            case "세탁방법 및 주의사항":
              return {
                ...item,
                content: [
                  product.announcement?.washing || "찬물 단독 세탁 권장",
                ],
              };
            default:
              return item;
          }
        }),
      };
    }

    return policy;
  });

  return (
    <>
      {/* 상품 썸네일,이름,가격,옵션선택 등 */}
      <ProductInfo
        session={session}
        product={product}
        setAddedOptions={setAddedOptions}
        addedOptions={addedOptions}
      />

      {/* 탭부터 상품상세부분 */}
      <DetailSection product={product} />

      {/* 리뷰 부분 */}
      <ReviewSection mockReviews={mockReviews} />

      {/* 상품정보 고시 */}
      {/* <GuideSection data={policy} /> */}
    </>
  );
}
