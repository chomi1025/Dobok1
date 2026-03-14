"use client";
import Link from "next/link";
import Image from "next/image";
import * as S from "./style";
import { useState } from "react";
import { useSession } from "next-auth/react";
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
  product: ProductWithFullDetails;
}

export default function ProductCard({ product }: Props) {
  const { name, thumbnail, id, options, category } = product;
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const defaultOption = options[0];
  const price = defaultOption?.price || 0;
  const stock = defaultOption?.stock || 0;
  const saleRate = defaultOption?.sale || 0;

  const mainSlug = category?.parent?.slug || "all";
  const subSlug = category?.slug || "item";

  const salePrice =
    (saleRate ?? 0) > 0
      ? Math.floor(price * (1 - (saleRate ?? 0) / 100))
      : price;

  const addToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    try {
      // 회원일때
      if (session) {
        setLoading(true);

        const result = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: id,
            quantity: 1,
          }),
        });

        if (!result.ok) {
          throw new Error("장바구니 추가 실패");
        }

        alert("장바구니에 담았습니다 🛒");
      } else {
        // 비회원일때
        const storedCart = localStorage.getItem("guestCart");
        let cart = storedCart ? JSON.parse(storedCart) : [];

        const existingIndex = cart.findIndex(
          (item: any) =>
            item.productId === id && item.optionId === defaultOption?.id,
        );
        // 중복 있으면
        if (existingIndex !== -1) {
          cart[existingIndex].quantity += 1;
        } else {
          // 중복 없으면(새로추가)
          cart.push({
            id: Date.now(),
            productId: id,
            optionId: defaultOption?.id,
            quantity: 1,
            product: { name, price, thumbnail },
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
          <Image src={thumbnail || "/default.png"} alt={name} fill />

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
