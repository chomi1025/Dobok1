"use client";
import * as O from "./style";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  totalPrice: number;
}

interface Order {
  id: number;
  orderNumber: string;
  items: OrderItem[];
}

const CLAIM_TYPES = [
  { label: "반품", value: "RETURN" },
  { label: "교환", value: "EXCHANGE" },
];

const CLAIM_REASONS = ["상품 불량", "배송 오류", "상품 설명과 다름", "기타"];

export default function ClaimNewClientPage({ order }: { order: Order }) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [reason, setReason] = useState("");
  const [detail, setDetail] = useState("");
  const [claimType, setClaimType] = useState<"RETURN" | "EXCHANGE">("RETURN"); // 기본값 반품

  const toggleItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const router = useRouter();

  const handleClaim = async () => {
    if (!reason) return alert("반품 사유를 선택해주세요!");
    if (!selectedItems.length) return alert("반품할 상품을 선택해주세요!");

    try {
      const res = await fetch("/api/mypage/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id, // ✅ 이거 추가
          orderItemIds: selectedItems,
          reason,
          detail,
          claimType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("서버 오류 데이터:", data);
        alert(data.message || "신청 실패");
        return;
      }

      alert("반품/교환 신청이 완료되었습니다!");
      router.push("/mypage/order"); // 신청 후 이동
    } catch (e) {
      console.error("Fetch 에러:", e);
      alert("신청 중 오류가 발생했습니다.");
    }
  };

  return (
    <O.Wrapper>
      <O.Title>반품 신청</O.Title>

      {/* 주문 요약 */}
      <O.Card>
        <O.CardTitle>주문 정보</O.CardTitle>
        <O.InfoGrid>
          <O.Label>주문번호</O.Label>
          <O.Value>{order?.orderNumber}</O.Value>
        </O.InfoGrid>
      </O.Card>

      <O.Divider />

      {/* 상품 선택 */}
      <O.Card>
        <O.CardTitle>반품 상품 선택</O.CardTitle>

        {order.items.map((item) => (
          <O.ProductCard key={item.id}>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => toggleItem(item.id)}
            />

            <Image
              src="/sample.png"
              alt={item.productName}
              width={70}
              height={70}
            />

            <O.ProductInfo>
              <O.ProductName>{item.productName}</O.ProductName>
              <O.ProductMeta>{item.quantity}개</O.ProductMeta>
              <O.ProductPrice>
                {item.totalPrice.toLocaleString()}원
              </O.ProductPrice>
            </O.ProductInfo>
          </O.ProductCard>
        ))}
      </O.Card>

      <O.Divider />

      <O.Card>
        <O.CardTitle>신청 종류</O.CardTitle>
        <select
          value={claimType}
          onChange={(e) =>
            setClaimType(e.target.value as "RETURN" | "EXCHANGE")
          }
          style={{ width: "100%", height: 44 }}
        >
          {CLAIM_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </O.Card>

      {/* 반품 사유 */}
      <O.Card>
        <O.CardTitle>반품 사유</O.CardTitle>

        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{ width: "100%", height: 44 }}
        >
          {/* <option value="">사유 선택</option> */}
          {CLAIM_REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <textarea
          placeholder="상세 사유를 입력해주세요"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          style={{
            width: "100%",
            marginTop: 12,
            minHeight: 120,
          }}
        />
      </O.Card>

      {/* 버튼 */}
      <O.ButtonRow>
        <O.Button onClick={() => router.back()}>취소</O.Button>
        <O.PrimaryButton onClick={handleClaim}>신청</O.PrimaryButton>
      </O.ButtonRow>
    </O.Wrapper>
  );
}
