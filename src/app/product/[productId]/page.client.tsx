"use client";

import { useSession } from "next-auth/react";
import ProductInfo from "./ProductInfo";
import DetailSection from "./DetailSection";
import ReviewSection from "./ReviewSection";
import { Category, Product, ProductOption } from "@prisma/client";
import { useProductOptions } from "@/components/customHook/useProductOptions";

export type ProductFull = Product & {
  options: ProductOption[];
  category: Category;
};

interface Props {
  product: ProductFull;
}

export default function ProductDetailClientPage({ product }: Props) {
  const optionState = useProductOptions(product);

  return (
    <>
      <ProductInfo product={product} {...optionState} />

      <DetailSection product={product} />

      <ReviewSection mockReviews={[]} />

      {/* <GuideSection data={policy} /> */}
    </>
  );
}
