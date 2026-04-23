"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import { Order, OrderStatus, Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

type OrderWithDetails = Prisma.OrderGetPayload<{
  include: {
    items: true;
    histories: true;
  };
}>;

interface Props {
  order: OrderWithDetails;
}

const NEXT_STATUS_OPTIONS: Record<string, string[]> = {
  PENDING: ["PAYMENT_COMPLETE", "CANCELLED"],
  PAYMENT_COMPLETE: ["PREPARING", "CANCELLED"],
  PREPARING: ["SHIPPING", "CANCELLED"],
  SHIPPING: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

const STATUS_MAP: Record<string, string> = {
  PENDING: "결제대기",
  PAYMENT_COMPLETE: "결제완료",
  PREPARING: "상품준비중",
  SHIPPING: "배송중",
  DELIVERED: "배송완료",
  CANCELLED: "취소됨",
};

export default function AdminOrderDetailClientPage({ order }: Props) {
  const router = useRouter();
  const [orderStatus, setOrderStatus] = useState(order.status || "PENDING");
  const [carrier, setCarrier] = useState(order.carrier || "");
  const [trackingNumber, setTrackingNumber] = useState(
    order.trackingNumber || "",
  );
  const [error, setError] = useState("");

  const currentStatus = order.status;
  const availableNextStatuses = NEXT_STATUS_OPTIONS[currentStatus] || [];

  //배송상태 바꾸기
  const handleSave = async () => {
    if (orderStatus === "SHIPPING" && (!carrier || !trackingNumber.trim())) {
      setError("택배사와 송장번호를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`/api/order/${order.orderNumber}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: orderStatus,
          carrier,
          trackingNumber,
        }),
      });

      if (!response.ok) throw new Error("업데이트 실패");

      alert("성공적으로 저장되었습니다!");
      setError("");

      router.refresh();
    } catch (err) {
      alert("서버 오류가 발생했습니다.");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>주문 상세 관리</h1>

      <section className={styles.section}>
        <h3 className={styles.section__title}>주문 정보</h3>
        <div className={styles.grid}>
          <InfoItem label="주문번호" value={order.orderNumber} />
          <InfoItem label="고객명(구매자)" value={order.buyerName} />
          <InfoItem label="연락처" value={order.buyerPhone} />
          <InfoItem label="이메일" value={order.buyerEmail} />
          <InfoItem
            label="결제금액"
            value={`${order.total.toLocaleString()}원`}
          />
          <InfoItem
            label="현재상태"
            value={STATUS_MAP[order.status] || order.status}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.section__title}>배송지 정보</h3>
        <div className={styles.grid}>
          <InfoItem label="수령인" value={order.receiverName} />
          <InfoItem label="연락처" value={order.receiverPhone} />
          <InfoItem
            label="주소"
            value={`(${order.postcode}) ${order.address} ${order.detailAddress}`}
          />
          <InfoItem label="요청사항" value={order.customRequest || "없음"} />
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.section__title}>상태 및 배송 관리</h3>
        <div className={styles.actionArea}>
          <div className={styles.row}>
            {availableNextStatuses.length > 0 ? (
              <>
                <select
                  className={styles.select}
                  value={orderStatus}
                  onChange={(e) =>
                    setOrderStatus(e.target.value as OrderStatus)
                  }
                >
                  <option value={currentStatus}>
                    {STATUS_MAP[currentStatus]}
                  </option>

                  {availableNextStatuses.map((statusKey) => (
                    <option key={statusKey} value={statusKey}>
                      {STATUS_MAP[statusKey]}
                    </option>
                  ))}
                </select>
                <button className={styles.btnPrimary} onClick={handleSave}>
                  상태 저장
                </button>
              </>
            ) : (
              <p className={styles.infoText}>
                현재 <strong>{STATUS_MAP[currentStatus]}</strong> 상태이며, 더
                이상 상태를 변경할 수 없습니다.
              </p>
            )}
          </div>

          {orderStatus === "SHIPPING" && (
            <div className={styles.inputGroup}>
              <select
                className={styles.select}
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
              >
                <option value="">택배사 선택</option>
                <option value="CJ">CJ대한통운</option>
                <option value="HANJIN">한진택배</option>
              </select>
              <input
                className={styles.input}
                type="text"
                placeholder="송장번호 입력"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>
          )}
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.section__title}>주문 상품 내역</h3>
        <div className={styles.product}>
          {order.items && order.items.length > 0 ? (
            order.items.map((item: any) => (
              <div key={item.id} className={styles.product__item}>
                <div className={styles.image}>
                  <Image
                    width={90}
                    height={90}
                    src={item.productImage}
                    alt={item.productName}
                  />
                </div>

                <div className={styles.details}>
                  <h4>{item.productName}</h4>
                  <p>
                    {item.optionName ? `옵션: ${item.optionName} / ` : ""}
                    수량: {item.quantity}개
                  </p>
                  <p>
                    <strong>
                      {(item.unitPrice * item.quantity).toLocaleString()}원
                    </strong>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#999",
                        marginLeft: "8px",
                      }}
                    ></span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.empty}>주문된 상품이 없습니다.</p>
          )}
        </div>

        <div
          style={{
            marginTop: "20px",
            paddingTop: "20px",
            borderTop: "1px solid #f5f5f5",
            textAlign: "right",
          }}
        >
          <span style={{ fontSize: "14px", color: "#666" }}>총 결제 금액 </span>
          <strong
            style={{ fontSize: "20px", color: "#222", marginLeft: "10px" }}
          >
            {order.total.toLocaleString()}원
          </strong>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.section__title}>주문 제작 정보 (커스텀)</h3>
        <div className={styles.customInfoArea}>
          <div className={styles.infoItem} style={{ marginBottom: "20px" }}>
            <div className={styles.label}>제작 요청 사항 및 문구</div>
            <div className={`${styles.value} ${styles.customText}`}>
              {order.customRequest ? (
                order.customRequest
                  .split("\n")
                  .map((line: string, i: number) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))
              ) : (
                <span style={{ color: "#ccc" }}>
                  입력된 요청 사항이 없습니다.
                </span>
              )}
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.label}>첨부된 디자인 시안</div>
            {order.customFileUrl ? (
              <div className={styles.fileBox}>
                <a
                  href={order.customFileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.fileLink}
                >
                  📎 첨부 파일 확인하기 (새창)
                </a>
              </div>
            ) : (
              <div className={styles.value} style={{ color: "#ccc" }}>
                첨부된 파일이 없습니다.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.section__title}>변경 히스토리</h3>
        <div className={styles.history__list}>
          {order.histories && order.histories.length > 0 ? (
            order.histories.map((item: any) => {
              // 아까 알려준 한글 치환 로직 포함
              let displayContent = item.content;
              Object.keys(STATUS_MAP).forEach((key) => {
                if (displayContent.includes(key)) {
                  displayContent = displayContent.replace(key, STATUS_MAP[key]);
                }
              });

              return (
                <div key={item.id} className={styles.history__item}>
                  <span className={styles.date}>
                    {new Date(item.createdAt).toLocaleString("ko-KR")}
                  </span>
                  <p className={styles.text}>
                    {displayContent} <small>({item.adminName})</small>
                  </p>
                </div>
              );
            })
          ) : (
            <p className={styles.empty}>히스토리가 없습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className={styles.infoItem}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value || "-"}</div>
    </div>
  );
}
