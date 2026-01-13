"use client";
import ProductCard from "./ProductCart";
import * as S from "./style";

export default function ProductList(props) {
  console.log(props?.product);

  return (
    <>
      <S.ProductList>
        {props?.product?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </S.ProductList>
    </>
  );
}
