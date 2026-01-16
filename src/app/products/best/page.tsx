"use client";
import * as B from "./style";
import ProductList from "@/components/product/ProductList";
import { PRODUCTS } from "@/assets/data/product";
import { Product } from "../../../components/product/ProductCard"; // Product 타입 import

export default function BestProductPage() {
  return (
    <>
      <B.Inner>
        <B.SectionHeader>
          <h2>베스트 상품</h2>
          <p>도복일번지의 베스트 상품을 모아왔어요</p>
        </B.SectionHeader>

        <ProductList product={PRODUCTS as Product[]} />
      </B.Inner>
    </>
  );
}
