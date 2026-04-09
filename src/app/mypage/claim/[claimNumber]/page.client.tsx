"use client";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

// 상태 한글로 변환하기 ~
const STATUS_MAP: Record<string, string> = {
  REQUESTED: "접수됨",
  APPROVED: "승인됨",
  COMPLETED: "처리완료",
  REJECTED: "반려됨",
};

// 타입 한글로 ~
const TYPE_MAP: Record<string, string> = {
  RETURN: "반품",
  EXCHANGE: "교환",
  CANCEL: "취소",
};

type ClaimType = "CANCEL" | "EXCHANGE" | "RETURN";
type ClaimStatus = "REQUESTED" | "APPROVED" | "COMPLETED" | "REJECTED";

// 2. 전체 데이터 구조
export interface Props {
  MOCK_CLAIM_DETAIL: {
    claimNumber: string;
    type: ClaimType;
    status: ClaimStatus;
    requestedAt: string;
    processedAt?: string | null;
    name: string;
    img: string | null;
    quantity: number;
    total: number;
    reason: string;
    detail: string;
  };
}

export default function ClaimDetailClientPage({ MOCK_CLAIM_DETAIL }: Props) {
  const { claimNumber } = useParams();
  const [claim, setClaim] = useState<any>(null);

  useEffect(() => {
    if (claimNumber) {
      setClaim(MOCK_CLAIM_DETAIL);
    }
  }, [claimNumber]);

  if (!claim) return <div>로딩중...</div>;
  if (claim.message) return <div>{claim.message}</div>; // 권한없음 or 데이터없음

  return (
    <div className={styles.inner}>
      <h1>취소/교환/반품 상세</h1>

      {/* 주문/클레임 요약 */}
      <section className={styles.card}>
        <h2>클레임 정보</h2>

        <div className={styles.infoGrid}>
          <span className={styles.label}>접수번호</span>
          <span className={styles.value}>{claim.claimNumber}</span>

          <span className={styles.label}>유형</span>
          <span className={styles.value}>
            {TYPE_MAP[claim.type] ?? claim.type}
          </span>

          <span className={styles.label}>상태</span>
          <span className={styles.value}>
            {STATUS_MAP[claim.status] ?? claim.status}
          </span>

          <span className={styles.label}>신청일</span>
          <span className={styles.value}>{claim.requestedAt}</span>
        </div>
      </section>

      <hr />

      {/* 상품 정보 */}
      <section className={styles.card}>
        <h2>상품 정보</h2>

        <div className={styles.productCard}>
          <Image
            src={claim.img ?? "/sample.png"}
            alt={claim.name}
            width={70}
            height={70}
          />

          <div className={styles.ProductInfo}>
            <p className={styles.ProductName}>{claim.name}</p>
            <p className={styles.productMeta}>수량: {claim.quantity}개</p>
            <p className={styles.productPrice}>
              총 {Number(claim.total).toLocaleString()}원
            </p>
          </div>
        </div>
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
              <span className={styles.value}>{claim.processedAt}</span>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
