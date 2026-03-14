"use client";
import ProductList from "@/components/product/ProductList";
import * as N from "./style";

export default function NewProductPage() {
  const mockProducts = [
    {
      id: 1,
      name: "신제품 유도복 01",
      thumbnail: "https://via.placeholder.com/500", // 임시 이미지
      options: [{ id: 101, price: 50000, stock: 10, sale: 10 }],
      category: {
        slug: "bottom",
        parent: { slug: "yudogi" },
      },
    },
    {
      id: 2,
      name: "신제품 유도복 02",
      thumbnail: "https://via.placeholder.com/500",
      options: [{ id: 102, price: 65000, stock: 5, sale: 0 }],
      category: {
        slug: "top",
        parent: { slug: "yudogi" },
      },
    },
  ];

  return (
    <>
      <N.Inner>
        <N.SectionHeader>
          <h2>신제품</h2>
          <p>도복일번지에서 새롭게 출시한 제품을 만나보세요</p>
        </N.SectionHeader>

        <ProductList products={mockProducts as any} />
      </N.Inner>
    </>
  );
}
