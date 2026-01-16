<<<<<<< HEAD
"use client";
import ProductList from "@/components/product/ProductList";
import * as N from "./style";
import { PRODUCTS } from "@/assets/data/product";

export default function NewProductPage() {
  return (
    <>
      <N.Inner>
        <N.SectionHeader>
          <h2>신제품</h2>
          <p>도복일번지에서 새롭게 출시한 제품을 만나보세요</p>
        </N.SectionHeader>

        <ProductList product={PRODUCTS} />
      </N.Inner>
    </>
  );
=======
export default function Header() {
  return <div>신제품 화면</div>;
>>>>>>> 83a61c5 (헤더)
}
