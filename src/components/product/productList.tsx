"use client";
import * as S from "./style";
import ProductCard, { Product } from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <>
      <S.ProductList>
        {products?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </S.ProductList>
    </>
  );
}
