"use client";
import BreadCrumb from "@/components/breadcrumb";
import * as O from "./style";
import { useRouter } from "next/navigation";

const STEPS = [
  { label: "장바구니", step: 0, path: "/cart" },
  { label: "주문서작성/결제", step: 1, path: "/checkout" },
  { label: "주문완료", step: 2, path: "/order/success" },
];

export default function OrderSuccessPage() {
  const router = useRouter();

  return (
    <O.Wrapper>
      <h2>주문완료</h2>
      <BreadCrumb steps={STEPS} />

      <O.Texts>
        <h3>주문이 정상적으로 접수 되었습니다!</h3>
        <p>감사합니다.</p>
      </O.Texts>

      <O.Box>
        <p>주문정보 : ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㅇㅁㄴㅇㅁ</p>
        <p>주문일자 : 2025-12-04</p>
      </O.Box>

      <O.Buttons>
        <button onClick={() => router.push("/")}>쇼핑 계속하기</button>
        <button onClick={() => router.push("/")}>주문내역 확인</button>
      </O.Buttons>
    </O.Wrapper>
  );
}
