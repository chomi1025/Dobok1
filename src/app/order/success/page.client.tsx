"use client";
import BreadCrumb from "@/components/breadcrumb";
import styles from "./page.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const STEPS = [
  { label: "장바구니", step: 0, path: "/cart" },
  { label: "주문서작성/결제", step: 1, path: "/checkout" },
  { label: "주문완료", step: 2, path: "/order/success" },
];

export default function OrderSuccessClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isConfirmed = false;

    const confirmPayment = async () => {
      if (isConfirmed) return;
      isConfirmed = true;

      try {
        const response = await fetch("/api/payment/toss", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentKey, orderId, amount }),
        });

        if (response.ok) {
          setIsLoading(false);
        } else {
          const errorData = await response.json();
          if (errorData.code === "ALREADY_PROCESSED_PAYMENT") {
            setIsLoading(false);
            return;
          }
          router.push("/order/fail");
        }
      } catch (error) {
        router.push("/order/fail");
      }
    };

    if (paymentKey && orderId && amount) {
      confirmPayment();
    }
  }, [paymentKey, orderId, amount, router]);
  return (
    <div className={styles.Wrapper}>
      <h2>주문완료</h2>
      <BreadCrumb steps={STEPS} />

      <section className={styles.SuccessSection}>
        <div className={styles.IconBox}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className={styles.Texts}>
          <h3>주문이 정상적으로 접수되었습니다!</h3>
          <p>
            초미님, 이용해주셔서 감사합니다. <br /> 배송이 시작되면 문자로
            안내해 드릴게요!
          </p>
        </div>
      </section>

      <div className={styles.InfoBox}>
        <h4>주문 정보</h4>

        <div className={styles.row}>
          <span>주문번호</span>
          <strong>{orderId}</strong>
        </div>
        <div className={styles.row}>
          <span>주문일자</span>
          <strong>{new Date().toLocaleDateString()}</strong>
        </div>
        <div className={styles.row}>
          <span>결제금액</span>
          <strong className={styles.price}>
            {Number(amount).toLocaleString()}원
          </strong>
        </div>
      </div>

      <div className={styles.Buttons}>
        <button className={styles.primary} onClick={() => router.push("/")}>
          쇼핑 계속하기
        </button>
        <button
          className={styles.secondary}
          onClick={() => router.push("/mypage/orders")}
        >
          주문내역 확인
        </button>
      </div>
    </div>
  );
}
