"use client";
import { useEffect, useState } from "react";
import CartEmptyComponent from "./CartEmpty";
import CartListComponent from "./CartList";
import styles from "./page.module.scss";
import BreadCrumb from "@/components/breadcrumb";
import { Session } from "next-auth";

interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
}

interface Props {
  user: Session["user"] | null;
  initialItems: CartItem[];
}

const STEPS = [
  { label: "장바구니", step: 0, path: "/cart" },
  { label: "주문서작성/결제", step: 1, path: "/checkout" },
  { label: "주문완료", step: 2, path: "/order/success" },
];

export default function CartClientPage({ user, initialItems }: Props) {
  const [cart, setCart] = useState<any[]>(initialItems || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //   회원이면
    if (user) {
      setLoading(false);
      return;
    }

    // 비회원이면
    try {
      const guestCart = localStorage.getItem("cart");

      if (guestCart) {
        setCart(JSON.parse(guestCart));
      }
    } catch (err) {
      console.error("비회원 장바구니 로딩 실패", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div className={styles.inner}>로딩중...</div>;

  return (
    <div className={styles.inner}>
      <header className={styles.sectionHeader}>
        <h1>장바구니</h1>

        <BreadCrumb steps={STEPS} />
      </header>

      {cart.length > 0 ? (
        <CartListComponent user={user} cart={cart} setCart={setCart} />
      ) : (
        <CartEmptyComponent />
      )}
    </div>
  );
}
