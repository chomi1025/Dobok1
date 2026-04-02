"use client";
import { useEffect, useState } from "react";
import CartEmptyComponent from "./CartEmpty";
import CartListComponent from "./CartList";
import styles from "./page.module.scss";
import BreadCrumb from "@/components/breadcrumb";
import { useSession } from "next-auth/react";

const STEPS = [
  { label: "장바구니", step: 0, path: "/cart" },
  { label: "주문서작성/결제", step: 1, path: "/checkout" },
  { label: "주문완료", step: 2, path: "/order/success" },
];

export default function CartClientPage() {
  const { data: session } = useSession();
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(session);

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);

      try {
        if (session?.user?.username) {
          // 회원
          const res = await fetch(`/api/cart`);

          if (res.ok) {
            const data = await res.json();
            setCart(data || []);
          }
        } else {
          // 비회원
          const guestCart = localStorage.getItem("cart");
          if (guestCart) setCart(JSON.parse(guestCart));
        }
      } catch (err) {
        console.error("장바구니 로딩 실패", err);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [session]);

  let cartContent;

  if (loading) {
    cartContent = <div className={styles.cartListLoading}>로딩중...</div>;
  } else if (cart.length > 0) {
    cartContent = (
      <CartListComponent user={session?.user} cart={cart} setCart={setCart} />
    );
  } else {
    cartContent = <CartEmptyComponent />;
  }

  return (
    <main className={styles.inner}>
      <header className={styles.sectionHeader}>
        <h1>장바구니</h1>

        <BreadCrumb steps={STEPS} />
      </header>

      <div className={styles.cartListArea}>{cartContent}</div>
    </main>
  );
}
