"use client";
import BreadCrumb from "@/components/breadcrumb";
import styles from "./page.module.scss";
import { useRouter, useSearchParams } from "next/navigation";

const STEPS = [
  { label: "장바구니", step: 0, path: "/cart" },
  { label: "주문서작성/결제", step: 1, path: "/checkout" },
  { label: "주문완료", step: 2, path: "/order/success" },
];

export default function OrderFailClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const message = searchParams.get("message") || "결제 중 오류가 발생했습니다.";
  const code = searchParams.get("code");

  return (
    <div className={styles.Wrapper}>
      <h2>주문 실패</h2>

      <hr />

      <section className={styles.FailSection}>
        <div className={styles.IconBox}>
          {/* 실패 아이콘 (X 표시) */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
        <div className={styles.Texts}>
          <h3>결제가 정상적으로 완료되지 않았습니다.</h3>
          <p>{message}</p>
        </div>
      </section>

      <div className={styles.InfoBox}>
        <h4>오류 상세 정보</h4>
        <div className={styles.row}>
          <span>에러 코드</span>
          <strong>{code || "UNKNOWN_ERROR"}</strong>
        </div>
        <div className={styles.row}>
          <span>발생 시간</span>
          <strong>{new Date().toLocaleString()}</strong>
        </div>

        <div className={styles.GuideMsg}>
          <p>
            지속적으로 결제에 실패할 경우, 고객센터나 카드사로 문의해 주세요.
          </p>
        </div>
      </div>

      <div className={styles.Buttons}>
        <button
          className={styles.primary}
          onClick={() => router.push("/checkout")}
        >
          다시 결제하기
        </button>
        <button
          className={styles.secondary}
          onClick={() => router.push("/cart")}
        >
          장바구니로 가기
        </button>
      </div>
    </div>
  );
}
