"use client";
import CartEmptyComponent from "./CartEmpty";
import CartListComponent from "./CartList";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import BreadCrumb from "@/components/breadcrumb";
import styles from "./page.module.scss";

const STEPS = [
  { label: "장바구니", step: 0, path: "/cart" },
  { label: "주문서작성/결제", step: 1, path: "/checkout" },
  { label: "주문완료", step: 2, path: "/order/success" },
];

export default function CartClientPage() {
  const { data: session, status } = useSession();

  const fetchCart = async () => {
    // 회원
    if (session) {
      const res = await fetch("/api/cart");
      if (!res.ok) throw new Error("장바구니 로드 실패");
      return res.json();
    }

    // 비회원
    const localData = JSON.parse(localStorage.getItem("cart") || "[]");
    return await fetchGuestCartData(localData);
  };

  const {
    data: cart = [],
    isLoading,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["cart", session?.user?.id],
    queryFn: fetchCart,
    enabled: status !== "loading",
    staleTime: 1000 * 60 * 5,
  });

  const showEmpty = isFetched && !isLoading && cart.length === 0;

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
          isLoading={isLoading || status === "loading"}
          user={session}
          cart={cart}
          refetch={refetch}
        />
      )}
    </div>
  );
}
