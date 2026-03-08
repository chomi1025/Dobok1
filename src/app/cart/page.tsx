"use client";
import { useEffect, useState } from "react";
import CartEmptyComponent from "./CartEmpty";
import CartListComponent from "./CartList";
import * as C from "./style";
import BreadCrumb from "@/components/breadcrumb";
import { useSession } from "next-auth/react";

interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
}

const STEPS = [
  { label: "장바구니", step: 0, path: "/cart" },
  { label: "주문서작성/결제", step: 1, path: "/checkout" },
  { label: "주문완료", step: 2, path: "/order/success" },
];

export default function CartPage() {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    const fetchCart = async () => {
      try {
        // 회원일때 !
        if (session) {
          const result = await fetch("/api/cart");

          if (!result.ok) {
            console.log(await result.text());
            throw new Error("장바구니 불러오기 실패");
          }

          const data = await result.json();
          console.log(data);
          setCart(data);
        } else {
          // 비회원일때 !
          const guestCart = localStorage.getItem("guestCart");
          setCart(guestCart ? JSON.parse(guestCart) : []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [session, status]);

  if (loading) return <div>로딩중...</div>;

  return (
    <C.Inner>
      <C.SectionHeader>
        <h2>장바구니</h2>

        <BreadCrumb steps={STEPS} />
      </C.SectionHeader>

      {cart.length > 0 ? (
        <CartListComponent cart={cart} setCart={setCart} />
      ) : (
        <CartEmptyComponent />
      )}
    </C.Inner>
  );
}
