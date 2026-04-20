"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { SHOPPING_POLICY } from "@/constants/policy";
import ProductInfo from "./ProductInfo";
import DetailSection from "./DetailSection";
import ReviewSection from "./ReviewSection";
import { ProductWithCategory } from "@/types/types";

interface Prop {
  productId: string;
}

export default function ProductDetailClientPage({ productId }: Prop) {
  const { data: session } = useSession();
  const [addedOptions, setAddedOptions] = useState<any[]>([]);

  const { data: product } = useQuery<ProductWithCategory>({
    queryKey: ["product", productId],

    queryFn: () =>
      fetch(`/api/products/${productId}`).then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
  });

  if (!product) return null;

  const policy = SHOPPING_POLICY.map((p) => {
    if (p.title === "상품 정보 고시") {
      return {
        ...p,
        items: p.items.map((item) => {
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
              return { ...item, content: [product.origin || "한국"] };
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
    return p;
  });

  return (
    <>
      <ProductInfo
        session={session}
        product={product}
        setAddedOptions={setAddedOptions}
        addedOptions={addedOptions}
      />
      <DetailSection product={product} />
      <ReviewSection mockReviews={[]} />
      {/* <GuideSection data={policy} /> */}
    </>
  );
}
