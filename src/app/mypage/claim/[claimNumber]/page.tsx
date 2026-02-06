"use client";
import * as O from "./style";
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

export default function ClaimDetailPage() {
  const { claimNumber } = useParams();
  const [claim, setClaim] = useState<any>(null);
  console.log("나와라!:", claim);

  useEffect(() => {
    if (!claimNumber) {
      console.log("claimNumber 없음");
      return;
    }

    console.log("fetch 시작:", claimNumber);

    fetch(`/api/mypage/claim/${claimNumber}`)
      .then((res) => {
        console.log("응답 상태:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("데이터:", data);
        setClaim(data);
      })
      .catch((err) => {
        console.error("fetch 오류:", err);
      });
  }, [claimNumber]);

  if (!claim) return <div>로딩중...</div>;
  if (claim.message) return <div>{claim.message}</div>; // 권한없음 or 데이터없음

  return (
    <O.Wrapper>
      <O.Title>취소/교환/반품 상세</O.Title>

      {/* 주문/클레임 요약 */}
      <O.Card>
        <O.CardTitle>클레임 정보</O.CardTitle>
        <O.InfoGrid>
          <O.Label>접수번호</O.Label>
          <O.Value>{claim.claimNumber}</O.Value>

          <O.Label>유형</O.Label>
          <O.Value>{TYPE_MAP[claim.type] ?? claim.type}</O.Value>

          <O.Label>상태</O.Label>
          <O.Value>{STATUS_MAP[claim.status] ?? claim.status}</O.Value>

          <O.Label>신청일</O.Label>
          <O.Value>{claim.requestedAt}</O.Value>
        </O.InfoGrid>
      </O.Card>

      <O.Divider />

      {/* 상품 정보 */}
      <O.Card>
        <O.CardTitle>상품 정보</O.CardTitle>
        <O.ProductCard>
          <Image
            src={claim.img ?? "/sample.png"}
            alt={claim.name}
            width={70}
            height={70}
          />
          <O.ProductInfo>
            <O.ProductName>{claim.name}</O.ProductName>
            <O.ProductMeta>수량: {claim.quantity}개</O.ProductMeta>
            <O.ProductPrice>
              총 {Number(claim.total).toLocaleString()}원
            </O.ProductPrice>
          </O.ProductInfo>
        </O.ProductCard>
      </O.Card>

      <O.Divider />

      {/* 사유/상세 */}
      <O.Card>
        <O.CardTitle>사유 / 상세</O.CardTitle>
        <O.InfoGrid>
          <O.Label>사유</O.Label>
          <O.Value>{claim.reason}</O.Value>

          <O.Label>상세</O.Label>
          <O.Value>{claim.detail}</O.Value>

          {claim.processedAt && (
            <>
              <O.Label>처리일</O.Label>
              <O.Value>{claim.processedAt}</O.Value>
            </>
          )}
        </O.InfoGrid>
      </O.Card>
    </O.Wrapper>
  );
}
