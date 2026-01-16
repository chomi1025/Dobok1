"use client";
import { usePathname } from "next/navigation";
import CartEmptyComponent from "./CartEmpty";
import * as C from "./style";

const STEPS = [
  { label: "장바구니", step: 0, path: "/cart" },
  { label: "주문서작성/결제", step: 1, path: "/order" },
  { label: "주문완료", step: 2, path: "/complete" },
];

export default function CartPage() {
  const pathname = usePathname();

  const currentStep =
    STEPS.find((step) => pathname.startsWith(step.path))?.step ?? 0;

  console.log(pathname);
  return (
    <C.Inner>
      <C.SectionHeader>
        <h2>장바구니</h2>

        <C.BreadCrumb>
          <ul>
            {STEPS.map((step) => (
              <C.Step key={step.path} $active={step.step <= currentStep}>
                {step.label}
              </C.Step>
            ))}
          </ul>
        </C.BreadCrumb>
      </C.SectionHeader>

      <CartEmptyComponent />
    </C.Inner>
  );
}
