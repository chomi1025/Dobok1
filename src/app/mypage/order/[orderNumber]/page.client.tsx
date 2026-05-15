"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

interface Address {
  postCode: string;
  address: string;
  detailAddress: string;
}

interface Shipping {
  name: string;
  phone: string;
  address: Address;
}

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  totalPrice: number;
  productImage: string;
  originalPrice?: number;
  salePrice?: number;
  discountRate?: number;
}

interface Order {
  id: number;
  orderNumber: string;
  date: string;
  status: string;
  items: OrderItem[];
  shipping: Shipping;
}

const ORDER_STATUS_LABEL: Record<string, string> = {
  PAYMENT_COMPLETE: "결제완료",
  PREPARING: "상품준비중",
  SHIPPING: "배송중",
  DELIVERED: "배송완료",
};

export default function OrderDetailClientPage({ order }: { order: Order }) {
  const router = useRouter();
  const totalPrice = order.items.reduce((sum, i) => sum + i.totalPrice, 0);
  const deliveryFee = totalPrice >= 50000 ? 0 : 3000;
  const grandTotal = totalPrice + deliveryFee;

  return (
    <div className={styles.inner}>
      <h1>주문 상세</h1>

      {/* 주문 정보 */}
      <section className={styles.card}>
        <h2>주문 정보</h2>

        <div className={styles.infoGrid}>
          <span className={styles.label}>주문번호</span>
          <span className={styles.value}>{order.orderNumber}</span>

          <span className={styles.label}>주문일자</span>
          <span className={styles.value}>{order.date}</span>

          <span className={styles.label}>주문상태</span>
          <span className={styles.value}>
            {ORDER_STATUS_LABEL[order.status] || order.status}
          </span>
        </div>
      </section>

      <hr />

      {/* 배송 정보 */}
      <section className={styles.card}>
        <h2>배송 정보</h2>

        <div className={styles.infoGrid}>
          <span className={styles.label}>수령인</span>
          <span className={styles.value}>{order.shipping.name}</span>

          <span className={styles.label}>연락처</span>
          <span className={styles.value}>{order.shipping.phone}</span>

          <span className={styles.label}>배송지</span>
          <p className={styles.address}>
            {order.shipping?.address
              ? `(${order.shipping.address.postCode}) ${order.shipping.address.address} ${order.shipping.address.detailAddress}`
              : "주소 없음"}
          </p>
        </div>
      </section>

      <hr />

      {/* 상품 정보 */}
      <section className={styles.card}>
        <h2>주문 상품</h2>
        {order.items.map((item) => {
          const unitSalePrice = item.totalPrice / item.quantity;

          const originalPrice = item.originalPrice ?? unitSalePrice;

          const discountRate =
            originalPrice > unitSalePrice
              ? Math.round(
                  ((originalPrice - unitSalePrice) / originalPrice) * 100,
                )
              : 0;

          return (
            <div className={styles.productCard} key={item.id}>
              <Image
                src={item.productImage || "/images/no-image.png"}
                alt={item.productName}
                width={80}
                height={80}
                style={{
                  objectFit: "cover",
                  background: "grey",
                  borderRadius: "5px",
                }}
              />

              <div className={styles.productInfo}>
                <p className={styles.productName}>{item.productName}</p>

                <p className={styles.productMeta}>{item.quantity}개</p>

                {/* 정가 */}
                {originalPrice > unitSalePrice && (
                  <p className={styles.originalPrice}>
                    {originalPrice.toLocaleString()}원
                  </p>
                )}

                <div className={styles.saleWrapper}>
                  {/* 판매가 */}
                  <p className={styles.salePrice}>
                    {unitSalePrice.toLocaleString()}원
                  </p>

                  {/* 할인율 */}
                  {discountRate > 0 && (
                    <span className={styles.discountRate}>
                      {discountRate}% 할인
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <hr />

      {/* 결제 금액 */}
      <section className={styles.card}>
        <h2>결제 금액</h2>
        <div className={styles.priceRow}>
          <span>상품금액</span>
          <span>{totalPrice.toLocaleString()}원</span>
        </div>

        <div className={styles.priceRow}>
          <span>배송비</span>
          <span>{deliveryFee.toLocaleString()}원</span>
        </div>

        <div className={`${styles.priceRow} ${styles.total}`}>
          <span>총 결제금액</span>
          <span>{grandTotal.toLocaleString()}원</span>
        </div>
      </section>

      {/* 버튼 */}
      <div className={styles.buttonRow}>
        <button>문의하기</button>

        {order.status === "PAYMENT_COMPLETE" && <button>주문취소</button>}

        {order.status === "SHIPPING" && <button>배송조회</button>}

        {order.status === "DELIVERED" && (
          <>
            <button
              className={styles.primaryButton}
              onClick={() =>
                router.push(
                  `/mypage/review/new?orderNumber=${order.orderNumber}`,
                )
              }
            >
              리뷰작성
            </button>
            <button
              onClick={() =>
                router.push(
                  `/mypage/claim/new?orderNumber=${order.orderNumber}`,
                )
              }
            >
              반품신청
            </button>
          </>
        )}
      </div>
    </div>
  );
}
