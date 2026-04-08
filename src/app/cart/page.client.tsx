"use client";
import { useEffect, useState } from "react";
import CartEmptyComponent from "./CartEmpty";
import CartListComponent from "./CartList";
import styles from "./page.module.scss";
import BreadCrumb from "@/components/breadcrumb";
import { Session } from "next-auth";

const STEPS = [
  { label: "장바구니", step: 0, path: "/cart" },
  { label: "주문서작성/결제", step: 1, path: "/checkout" },
  { label: "주문완료", step: 2, path: "/order/success" },
];

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

interface Props {
  session: Session | null;
  initialCart: [];
}

export default function CartClientPage({ session, initialCart }: Props) {
  const [cart, setCart] = useState<CartItemType[]>(initialCart);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 비회원일 때만 실행
    if (session && initialCart.length > 0) {
      setIsLoading(false);
      return;
    }

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

    fetchGuestCart();
  }, [session, initialCart]);

  const showEmpty = !isLoading && cart.length === 0;

  return (
    <div className={styles.inner}>
      <header className={styles.sectionHeader}>
        <h1>장바구니</h1>

        <BreadCrumb steps={STEPS} />
      </header>

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
    </div>
  );
}
