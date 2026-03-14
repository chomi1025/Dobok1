"use client";

import { useState } from "react";
import * as S from "./style";
import Image from "next/image";

type OrderStatus =
  | "입금대기"
  | "결제완료"
  | "상품준비중"
  | "배송중"
  | "배송완료";

type PaymentMethod = "bank" | "card" | "kakao" | "naver";

// 공통
interface BaseOrder {
  orderId: string;
  customerName: string;
  paymentStatus: OrderStatus;
}

// 무통장
interface BankOrder extends BaseOrder {
  paymentMethod: "bank";
  bankName: string;
  depositorName: string;
}

// 카드
interface CardOrder extends BaseOrder {
  paymentMethod: "card";
  cardCompany: string; // 국민카드, 신한카드
  approvalNumber: string; // 승인번호
  approvedAt: string; // 승인일시
}

// 카카오
interface KakaoOrder extends BaseOrder {
  paymentMethod: "kakao";
  provider: "카카오페이";
  approvalNumber: string;
  approvedAt: string;
}

// 네이버
interface NaverOrder extends BaseOrder {
  paymentMethod: "naver";
  provider: "네이버페이";
  approvalNumber: string;
  approvedAt: string;
}

type Order = BankOrder | CardOrder | KakaoOrder | NaverOrder;

const ORDER_STATUS: Record<PaymentMethod, OrderStatus[]> = {
  bank: ["입금대기", "결제완료", "상품준비중", "배송중", "배송완료"],
  kakao: ["결제완료", "상품준비중", "배송중", "배송완료"],
  naver: ["결제완료", "상품준비중", "배송중", "배송완료"],
  card: ["결제완료", "상품준비중", "배송중", "배송완료"],
};

const order: Order = {
  orderId: "20260224002",
  customerName: "김이모션",
  paymentMethod: "card",
  paymentStatus: "결제완료",
  cardCompany: "신한카드",
  approvalNumber: "12345678",
  approvedAt: "2026-02-24 14:21",
};

export default function AdminOrderDetailPage() {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(
    order.paymentStatus,
  );
  const [carrier, setCarrier] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [error, setError] = useState("");

  const [history, setHistory] = useState([
    {
      date: "2024-02-24 10:12",
      content: "주문 생성",
      admin: "system",
    },
  ]);

  const STATUS_FLOW = ORDER_STATUS[order.paymentMethod];

  const addHistory = (content: string) => {
    setHistory((prev) => [
      ...prev,
      {
        date: new Date().toLocaleString(),
        content,
        admin: "관리자",
      },
    ]);
  };

  const handleSave = () => {
    if (orderStatus === "배송중") {
      if (!carrier || !trackingNumber.trim()) {
        setError("배송중 상태에서는 택배사와 송장번호가 필수입니다.");
        return;
      }
    }

    setError("");

    addHistory(`주문상태 → ${orderStatus}`);

    if (orderStatus === "배송중") {
      addHistory(`송장 등록 (${carrier} / ${trackingNumber})`);
    }

    console.log({
      orderStatus,
      carrier,
      trackingNumber,
    });

    alert("저장 완료");
  };

  return (
    <S.Inner>
      <S.Title>주문 상세</S.Title>

      <hr />

      {/* 주문 정보 */}
      <S.Section>
        <S.SectionTitle>[ 주문 정보 ]</S.SectionTitle>
        <S.Grid>
          <InfoItem label="주문일" value="2024-02-24" />
          <InfoItem label="주문번호" value="#20240224" />
          <InfoItem label="고객명" value="홍길동" />
          <InfoItem label="결제금액" value="49,000원" />
        </S.Grid>
      </S.Section>

      <hr />
      {/* 결제 정보 추가 */}
      <S.Section>
        <S.SectionTitle>[ 결제 정보 ]</S.SectionTitle>
        <S.Grid>
          <InfoItem label="결제수단" value={order.paymentMethod} />
          <InfoItem label="결제상태" value={order.paymentStatus} />

          {order.paymentMethod === "bank" && (
            <>
              <InfoItem label="입금은행" value={order.bankName} />
              <InfoItem label="입금자명" value={order.depositorName} />
            </>
          )}

          {order.paymentMethod === "card" && (
            <>
              <InfoItem label="카드사" value={order.cardCompany} />
              <InfoItem label="승인번호" value={order.approvalNumber} />
              <InfoItem label="승인일시" value={order.approvedAt} />
            </>
          )}

          {order.paymentMethod === "kakao" && (
            <>
              <InfoItem label="결제사" value={order.provider} />
              <InfoItem label="승인번호" value={order.approvalNumber} />
              <InfoItem label="승인일시" value={order.approvedAt} />
            </>
          )}

          {order.paymentMethod === "naver" && (
            <>
              <InfoItem label="결제사" value={order.provider} />
              <InfoItem label="승인번호" value={order.approvalNumber} />
              <InfoItem label="승인일시" value={order.approvedAt} />
            </>
          )}
        </S.Grid>
      </S.Section>

      <hr />
      {/* 상품 목록 */}
      <S.Section>
        <S.SectionTitle>상품 목록</S.SectionTitle>

        <S.ItemBox>
          <Image
            alt="상품"
            src=""
            width={80}
            height={80}
            style={{ backgroundColor: "black", marginRight: "20px" }}
          />
          <div>
            <h4>오버핏 후드티</h4>
            <p>수량: 2</p>
            <p>옵션: 블랙 / L</p>
          </div>
        </S.ItemBox>

        <S.ItemBox>
          <Image
            alt="상품"
            src=""
            width={80}
            height={80}
            style={{ backgroundColor: "black", marginRight: "20px" }}
          />
          <div>
            <h4>오버핏 후드티</h4>
            <p>수량: 2</p>
            <p>옵션: 블랙 / L</p>
          </div>
        </S.ItemBox>
      </S.Section>

      <hr />

      {/* 배송 정보 */}
      <S.Section>
        <S.SectionTitle>배송 정보</S.SectionTitle>
        <S.Grid>
          <InfoItem label="수령인" value="홍길동" />
          <InfoItem label="연락처" value="010-1234-5678" />
          <InfoItem label="주소" value="서울시 강남구 ..." />
          <InfoItem label="요청사항" value="문 앞에 놓아주세요" />
        </S.Grid>
      </S.Section>

      <hr />

      {/* 상태 변경 */}
      <S.Section>
        <S.SectionTitle>주문 상태 변경</S.SectionTitle>

        <S.ActionRow>
          <S.SelectWrapper>
            <S.Select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value as OrderStatus)}
            >
              {STATUS_FLOW.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </S.Select>
            <S.Arrow>▼</S.Arrow>
          </S.SelectWrapper>

          {orderStatus === "배송중" && (
            <S.DeliveryBox>
              <S.SelectWrapper>
                <S.Select
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                >
                  <option value="">택배사 선택</option>
                  <option value="CJ">CJ대한통운</option>
                  <option value="HANJIN">한진택배</option>
                  <option value="LOTTE">롯데택배</option>
                </S.Select>
                <S.Arrow>▼</S.Arrow>
              </S.SelectWrapper>

              <S.Input
                type="text"
                placeholder="송장번호 입력"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </S.DeliveryBox>
          )}

          <S.PrimaryButton onClick={handleSave}>저장</S.PrimaryButton>
        </S.ActionRow>

        {error && <S.ErrorText>{error}</S.ErrorText>}
      </S.Section>

      <hr />

      {/* 관리자 메모 */}
      <S.Section>
        <S.SectionTitle>관리자 메모</S.SectionTitle>
        <S.TextArea placeholder="메모를 입력하세요..." />
        <S.PrimaryButton style={{ marginTop: 12 }}>메모 저장</S.PrimaryButton>
      </S.Section>

      <hr />

      {/* 변경 히스토리 */}
      <S.Section>
        <S.SectionTitle>변경 히스토리</S.SectionTitle>

        <S.HistoryList>
          {history.map((item, idx) => (
            <S.HistoryItem key={idx}>
              <span>{item.date}</span>
              <p>
                {item.content} ({item.admin})
              </p>
            </S.HistoryItem>
          ))}
        </S.HistoryList>
      </S.Section>
    </S.Inner>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <S.Label>{label}</S.Label>
      <S.Value>{value}</S.Value>
    </div>
  );
}
