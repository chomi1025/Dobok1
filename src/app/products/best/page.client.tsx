"use client";

import { useQuery } from "@tanstack/react-query";
import ProductPageComponent from "@/components/product/new_bestPage/page";

interface Props {
  currentPage: number;
  pageSize: number;
}

const title = {
  name: "베스트 상품",
  contents: "도복일번지의 베스트 상품을 모아왔어요",
};

export default function BestProductClientPage({
  currentPage,
  pageSize,
}: Props) {
  const { data } = useQuery({
    queryKey: ["products", "best", currentPage],
    queryFn: async () => {
      const res = await fetch(`/api/products/best`);
      if (!res.ok) throw new Error("데이터 로드 실패");
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
