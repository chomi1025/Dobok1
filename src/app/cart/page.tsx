"use client";
import { usePathname } from "next/navigation";
import CartEmptyComponent from "./CartEmpty";
import * as C from "./style";
import BreadCrumb from "@/components/breadcrumb";

const STEPS = [
  { label: "장바구니", step: 0, path: "/cart" },
  { label: "주문서작성/결제", step: 1, path: "/checkout" },
  { label: "주문완료", step: 2, path: "/order/success" },
];

export default function CartPage() {
  const pathname = usePathname();

  return (
    <C.Inner>
      <C.SectionHeader>
        <h2>장바구니</h2>

        <BreadCrumb steps={STEPS} />
      </C.SectionHeader>

      <CartEmptyComponent />
    </C.Inner>
  );
}
