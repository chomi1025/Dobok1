"use client";
import * as S from "./style";
import ProductCard from "./ProductCard";
import { Prisma } from "@prisma/client";

type ProductWithFullDetails = Prisma.ProductGetPayload<{
  include: {
    options: true;
    category: {
      include: { parent: true };
    };
  };
}>;

interface Props {
  products: ProductWithFullDetails[];
}

export default function ProductList({ products }: Props) {
  const hasProducts = products && products.length > 0;

  return (
    <>
      <S.ProductList>
        {hasProducts ? (
          products?.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <span>없음</span>
        )}
      </S.ProductList>
    </>
  );
}
