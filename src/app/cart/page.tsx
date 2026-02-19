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

  const removeItem = (productId: number) => {
    const storedCart = localStorage.getItem("guestCart");
    if (!storedCart) return;

    const cart = JSON.parse(storedCart);

    const updatedCart = cart.filter(
      (item: any) => item.product.id !== productId,
    );

    localStorage.setItem("guestCart", JSON.stringify(updatedCart));
  };

  console.log("세션뭐야", session);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // 회원일때 ! 세션가져와서
        if (session) {
          const res = await fetch("/api/cart");

          if (!res.ok) throw new Error("장바구니 불러오기 실패");

          const data = await res.json();
          setCart(data);
        } else {
          //비회원일때 ! 로컬스토리지 이용
          const guestCart = localStorage.getItem("guestCart");
          if (guestCart) {
            setCart(JSON.parse(guestCart));
          } else {
            setCart([]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

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
