"use client";
import styles from "./page.module.scss";
import Image from "next/image";
import { OrderItem } from "@prisma/client";

// 상태 한글로
const STATUS_MAP: Record<string, string> = {
  REQUESTED: "접수됨",
  APPROVED: "승인됨",
  COMPLETED: "처리완료",
  REJECTED: "반려됨",
};

// 타입 한글로
const TYPE_MAP: Record<string, string> = {
  RETURN: "반품",
  EXCHANGE: "교환",
  CANCEL: "취소",
};

interface ClaimDetail {
  claimNumber: string;
  claimType: string;
  status: string;
  requestedAt: Date;
  processedAt: Date | null;
  reason: string | null;
  detail: string;
  items: OrderItem[];
}

interface Props {
  claim: ClaimDetail;
}

export default function ClaimDetailClientPage({ claim }: Props) {
  const formatDate = (date?: Date | string | null) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.inner}>
      <h1>취소/교환/반품 상세</h1>

      {/* 주문/클레임 요약 */}
      <section className={styles.card}>
        <h2>기본 정보</h2>

        <div className={styles.infoGrid}>
          <span className={styles.label}>접수번호</span>
          <span className={styles.value}>{claim.claimNumber}</span>

          <span className={styles.label}>유형</span>
          <span className={styles.value}>
            {TYPE_MAP[claim.claimType] ?? claim.claimType}
          </span>

          <span className={styles.label}>상태</span>
          <span className={styles.value}>
            {STATUS_MAP[claim.status] ?? claim.status}
          </span>

          <span className={styles.label}>신청일</span>
          <span className={styles.value}>{formatDate(claim.requestedAt)}</span>
        </div>
      </section>

      <hr />

      {/* 상품 정보 */}
      <section className={styles.card}>
        <h2>상품 정보</h2>

        {claim.items.map((item: OrderItem) => {
          return (
            <div className={styles.productCard}>
              <Image
                src={item.productImage ?? "/sample.png"}
                alt={item.productName}
                width={70}
                height={70}
              />

              <div className={styles.ProductInfo}>
                <p className={styles.ProductName}>{item.productName}</p>
                <p className={styles.productMeta}>수량: {item.quantity}개</p>
                <p className={styles.productPrice}>
                  총 {Number(item.totalPrice).toLocaleString()}원
                </p>
              </div>
            </div>
          );
        })}
      </section>

      <hr />

      {/* 사유/상세 */}
      <section className={styles.card}>
        <h2>사유 / 상세</h2>

        <div className={styles.infoGrid}>
          <span className={styles.label}>사유</span>
          <span className={styles.value}>{claim.reason}</span>

          <span className={styles.label}>상세</span>
          <span className={styles.value}>{claim.detail}</span>

          {claim.processedAt && (
            <>
              <span className={styles.label}>처리일</span>
              <span className={styles.value}>
                {formatDate(claim.processedAt)}
              </span>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
