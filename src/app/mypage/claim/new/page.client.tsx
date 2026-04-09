"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

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
  const [claimType, setClaimType] = useState<"RETURN" | "EXCHANGE">("RETURN");

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
          orderId: order.id,
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
      router.push("/mypage/order");
    } catch (e) {
      console.error("Fetch 에러:", e);
      alert("신청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.inner}>
      <h1>반품 신청</h1>

      {/* 주문 요약 */}
      <section className={styles.card}>
        <h2 className={styles.CardTitle}>주문 정보</h2>

        <div className={styles.infoGrid}>
          <span className={styles.label}>주문번호</span>
          <span className={styles.value}>{order?.orderNumber}</span>
        </div>
      </section>

      <hr />

      {/* 상품 선택 */}
      <section className={styles.card}>
        <h2 className={styles.CardTitle}>반품 상품 선택</h2>

        {order.items.map((item) => (
          <div className={styles.productCard} key={item.id}>
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

            <div className={styles.productInfo}>
              <p className={styles.productName}>{item.productName}</p>
              <p className={styles.productMeta}>{item.quantity}개</p>
              <p className={styles.productPrice}>
                {item.totalPrice.toLocaleString()}원
              </p>
            </div>
          </div>
        ))}
      </section>

      <hr />

      <section className={styles.card}>
        <h2 className={styles.CardTitle}>신청 종류</h2>

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
      </section>

      <hr />

      {/* 반품 사유 */}
      <section className={styles.card}>
        <h2 className={styles.CardTitle}>반품 사유</h2>

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
      </section>

      {/* 버튼 */}
      <div className={styles.buttonRow}>
        <button onClick={() => router.back()}>취소</button>
        <button onClick={handleClaim}>신청</button>
      </div>
    </div>
  );
}
