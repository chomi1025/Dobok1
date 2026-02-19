"use client";
import * as B from "./style";
import ProductList from "@/components/product/ProductList";
import { Product } from "@prisma/client";

interface Props {
  products: Product[];
}

export default function BestProductClientPage({ products }: Props) {
  console.log(products);
  return (
    <>
      <B.Inner>
        <B.SectionHeader>
          <h2>베스트 상품</h2>
          <p>도복일번지의 베스트 상품을 모아왔어요</p>
        </B.SectionHeader>

        <ProductList products={products} />
      </B.Inner>
    </>
  );
}
