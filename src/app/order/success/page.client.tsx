"use client";
import BreadCrumb from "@/components/breadcrumb";
import styles from "./page.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const STEPS = [
  { label: "장바구니", step: 0, path: "/cart" },
  { label: "주문서작성/결제", step: 1, path: "/checkout" },
  { label: "주문완료", step: 2, path: "/order/success" },
];

export default function OrderSuccessClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [userName, setUserName] = useState("");

  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const [isLoading, setIsLoading] = useState(true);
  const hasCalled = useRef(false);

  useEffect(() => {
    const confirmPayment = async () => {
      if (hasCalled.current) return;
      hasCalled.current = true;

      try {
        const response = await fetch("/api/payment/toss", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentKey, orderId, amount }),
        });

        if (response.ok) {
          const data = await response.json();

          setUserName(data.userName);
          setIsLoading(false);
        } else {
          const errorData = await response.json();

          const safeCodes = [
            "ALREADY_PROCESSED_PAYMENT",
            "ALREADY_PROCESSING_REQUEST",
          ];

          if (safeCodes.includes(errorData.code) || response.status === 409) {
            console.log("이미 처리 중이거나 완료된 요청입니다.");

            if (errorData.userName) setUserName(errorData.userName);

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

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("주문번호가 복사되었습니다!");
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

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
            {userName || "고객"}님, 이용해주셔서 감사합니다. <br />
            <span style={{ color: "#ff4d4f", fontWeight: "bold" }}>
              비회원 주문은 주문번호를 꼭 메모하거나 캡처해 주세요!
            </span>
          </p>
        </div>
      </section>

      <div className={styles.InfoBox}>
        <h4>주문 정보</h4>

        <div className={styles.row}>
          <span>주문번호</span>

          <div>
            <strong>{orderId} </strong>
            <button
              className={styles.copyButton}
              onClick={() => orderId && handleCopy(orderId)}
              title="주문번호 복사"
            >
              {/* 복사 아이콘 SVG */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
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
