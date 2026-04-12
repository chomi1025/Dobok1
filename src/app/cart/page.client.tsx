"use client";
import { useEffect, useState } from "react";
import CartEmptyComponent from "./CartEmpty";
import CartListComponent from "./CartList";
import { useSession } from "next-auth/react";

interface CartItemType {
  id: number;
  productId: number;
  productOptionId?: number;
  productName: string;
  thumbnail: string;
  price: number;
  quantity: number;
  option?: string;
  isCustomizable?: boolean;
  product?: any;
  productOption?: any;
}

export default function CartClientPage() {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    //비회원이면
    const fetchGuestCart = async () => {
      setIsLoading(true);

      const localData = JSON.parse(localStorage.getItem("cart") || "[]");

      if (localData.length === 0) {
        setCart([]);
        setIsLoading(false);
        return;
      }

      try {
        const optionIds = localData
          .map((item: any) => item.productOptionId)
          .join(",");

        const res = await fetch(`/api/products/options?ids=${optionIds}`);
        if (!res.ok) throw new Error("장바구니 정보를 불러오지 못했습니다.");

        const serverInfo = await res.json();

        const fullCart = localData.map((localItem: any) => {
          const info = serverInfo.find(
            (s: any) => Number(s.id) === Number(localItem.productOptionId),
          );

          return info
            ? {
                ...localItem,
                ...info,
                productName: info.product?.name || localItem.productName,
                thumbnail: info.product?.thumbnail || localItem.thumbnail,
                id: info.id,
              }
            : localItem;
        });

        setCart(fullCart);
      } catch (error) {
        console.error("비회원 장바구니 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const loadCartData = async () => {
      setIsLoading(true);

      try {
        if (session) {
          const res = await fetch("/api/cart");
          const data = await res.json();
          setCart(data);
        } else {
          await fetchGuestCart();
        }
      } catch (error) {
        console.error("데이터 로드 중 에러:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCartData();
  }, [session, status]);

  const showEmpty = !isLoading && cart.length === 0;

  return (
    <>
      {showEmpty ? (
        <CartEmptyComponent />
      ) : (
        <CartListComponent
          isLoading={isLoading}
          user={session}
          cart={cart}
          setCart={setCart}
        />
      )}
    </>
  );
}
