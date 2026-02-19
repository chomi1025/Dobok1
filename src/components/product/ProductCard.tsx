"use client";
import Link from "next/link";
import Image from "next/image";
import * as S from "./style";
import { useState } from "react";
import { useSession } from "next-auth/react";

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
  const { name, price, saleRate, thumbnail, mainSlug, subSlug, id } = product;
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const salePrice =
    (saleRate ?? 0) > 0
      ? Math.floor(price * (1 - (saleRate ?? 0) / 100))
      : price;

  // 장바구니 함수

  const addToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Link 이동 막기 (중요)
    e.stopPropagation();

    if (loading) return;

    try {
      // 회원일때
      if (session) {
        setLoading(true);

        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: id,
            quantity: 1,
          }),
        });

        if (!res.ok) {
          throw new Error("장바구니 추가 실패");
        }

        alert("장바구니에 담았습니다 🛒");
      } else {
        // 비회원일때
        const storedCart = localStorage.getItem("guestCart");
        let cart = storedCart ? JSON.parse(storedCart) : [];

        // 중복있는지 체크
        const existingIndex = cart.findIndex(
          (item: any) => item.product.id === id,
        );

        // 중복 있으면
        if (existingIndex !== -1) {
          cart[existingIndex].quantity += 1;
        } else {
          // 중복 없으면(새로추가)
          cart.push({
            id: Date.now(),
            quantity: 1,
            product: {
              id: id,
              name: name,
              price: price,
            },
          });
        }

        localStorage.setItem("guestCart", JSON.stringify(cart));

        alert("장바구니에 담았습니다 🛒");
      }
    } catch (err) {
      console.error(err);
      alert("오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <li>
      <Link href={`/products/${mainSlug}/${subSlug}/${id}`}>
        <S.Image_Wrapper>
          <Image src={thumbnail} alt={name} width={500} height={500} />

          {/* 장바구니 아이콘 */}
          <span onClick={addToCart} />
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
