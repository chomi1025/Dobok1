"use client";
import * as S from "./style";
import ProductCard, { Product } from "./ProductCard";

interface Props {
  product: Product[];
}

export default function ProductList({ product }: Props) {
  return (
    <>
      <S.ProductList>
        {product?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </S.ProductList>
    </>
  );
}
