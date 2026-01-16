"use client";
import Link from "next/link";
import Image from "next/image";
import * as S from "./style";

export interface Product {
  id: string;
  name: string;
  price: number;
  saleRate?: number; // optional
  thumbnail: string;
  mainSlug: string;
  subSlug: string;
  originalPrice?: number; // optional
  isBest?: boolean; // optional
  stock: number;
  isNew?: boolean; // optional
  rating?: number; // optional
  reviewCount?: number; // optional
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  console.log(product);

  const { name, price, saleRate, thumbnail, mainSlug, subSlug, id } = product;

  const salePrice =
    (saleRate ?? 0) > 0
      ? Math.floor(price * (1 - (saleRate ?? 0) / 100))
      : price;

  return (
    <li>
      <Link href={`/products/${mainSlug}/${subSlug}/${id}`}>
        <S.Image_Wrapper>
          <Image src={thumbnail} alt={name} width={500} height={500} />

          {/* 장바구니 아이콘 */}
          <span />
        </S.Image_Wrapper>

        <S.Info_Wrapper>
          <S.Product_Title>{name}</S.Product_Title>

          <S.Product_price>
            {(saleRate ?? 0) > 0 && <S.Sale>{saleRate}%</S.Sale>}

            <S.Price>
              <strong>{salePrice.toLocaleString()}</strong>원
            </S.Price>

            {(saleRate ?? 0) > 0 && <small>{price.toLocaleString()}원</small>}
          </S.Product_price>
        </S.Info_Wrapper>
      </Link>
    </li>
  );
}
