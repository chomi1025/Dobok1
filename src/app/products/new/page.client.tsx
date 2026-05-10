"use client";

import { useQuery } from "@tanstack/react-query";
import ProductPageComponent from "@/components/product/new_bestPage/page";

interface Props {
  currentPage: number;
  pageSize: number;
}

const title = {
  name: "신제품",
  contents: "도복일번지에서 새롭게 출시한 제품을 만나보세요",
};

export default function NewProductClientPage({ currentPage, pageSize }: Props) {
  const { data } = useQuery({
    queryKey: ["products", "new", currentPage],
    queryFn: async () => {
      const res = await fetch(`/api/products/new`);
      if (!res.ok) throw new Error("신제품 로드 실패");
      return res.json();
    },
  });

  const products = data?.products || [];
  const totalItems = data?.totalItems || 0;

  return (
    <ProductPageComponent
      title={title}
      products={products}
      totalItems={totalItems}
      currentPage={currentPage}
      pageSize={pageSize}
    />
  );
}
