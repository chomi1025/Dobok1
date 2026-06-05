"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import Link from "next/link";

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

interface Order {
  id: number;
  orderNumber: string;
  date: string;
  status: string;
  items: GroupedOrderItem[];
  shipping: Shipping;
  carrier: string | null;
  trackingNumber: string | null;
}

interface OrderOption {
  orderItemId: number;
  optionText: string | null;
  price: number;
  quantity: number;
  hasReview: boolean;
  reviewId: number | null;
}

interface GroupedOrderItem {
  productId: number;
  productName: string;
  productImage: string | null;
  hasAnyReview: boolean;
  reviewId: number | null;
  options: OrderOption[];
}

const ORDER_STATUS_LABEL: Record<string, string> = {
  PAYMENT_COMPLETE: "결제완료",
  PREPARING: "상품준비중",
  SHIPPING: "배송중",
  DELIVERED: "배송완료",
  CANCELLED: "주문취소",
};

const carrierMap: Record<string, string> = {
  CJ: "kr.cjlogistics",
  한진택배: "kr.hanjin",
  롯데택배: "kr.lotte",
  로젠택배: "kr.logen",
  우체국택배: "kr.epost",
};

export default function OrderDetailClientPage({ order }: { order: Order }) {
  const router = useRouter();
  const totalPrice = order.items.reduce((sum, item) => {
    const itemTotal = item.options.reduce(
      (optionSum, opt) => optionSum + opt.price,
      0,
    );

    return sum + itemTotal;
  }, 0);
  const deliveryFee = totalPrice >= 50000 ? 0 : 3000;
  const grandTotal = totalPrice + deliveryFee;

  const handleCancelOrder = async () => {
    const confirmed = window.confirm("주문을 취소하시겠습니까?");

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/order/${order.orderNumber}/cancel`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("주문이 취소되었습니다.");

      router.refresh();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "주문 취소 중 오류가 발생했습니다.",
      );
    }
  };

  //배송조회
  const handleTracking = () => {
    if (!order.carrier || !order.trackingNumber) return;
    const carrierCode = carrierMap[order.carrier];

    window.open(
      `https://tracker.delivery/#/${carrierCode}/${order.trackingNumber}`,
      "_blank",
    );
  };

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
          <span className={styles.value}>{order.shipping?.name}</span>

          <span className={styles.label}>연락처</span>
          <span className={styles.value}>{order.shipping?.phone}</span>

          <span className={styles.label}>배송지</span>
          <p className={styles.address}>
            {order.shipping?.address
              ? `(${order.shipping?.address.postCode}) ${order.shipping?.address.address} ${order.shipping?.address.detailAddress}`
              : "주소 없음"}
          </p>
        </div>
      </section>

      <hr />

      {/* 상품 정보 */}
      <section className={styles.card}>
        <h2>주문 상품</h2>

        {order.items.map((item) => (
          <div className={styles.productBlock} key={item.productId}>
            <div className={styles.optionList}>
              {item.options.map((opt) => (
                <div className={styles.optionCard} key={opt.orderItemId}>
                  <Image
                    src={item.productImage || ""}
                    width={60}
                    height={60}
                    alt=""
                  />

                  <div className={styles.info}>
                    <div className={styles.name}>{item.productName}</div>

                    <div className={styles.option}>
                      {opt.optionText}
                      <span className={styles.qty}>/ {opt.quantity}개</span>
                    </div>

                    <div className={styles.price}>
                      {opt.price.toLocaleString()}원
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {order.status === "DELIVERED" && (
              <div className={styles.rightBlock}>
                {item.hasAnyReview ? (
                  <Link
                    className={styles.reviewBtn}
                    href={`/mypage/review/${item.reviewId}`}
                  >
                    리뷰보기
                  </Link>
                ) : (
                  <Link
                    className={styles.reviewBtnPrimary}
                    href={`/mypage/review/new?id=${item.productId}`}
                  >
                    리뷰작성
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
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
        <Link
          href={`/support/inquiry/new?orderNumber=${order.orderNumber}`}
          className={styles.inquiryButton}
        >
          문의하기
        </Link>

        {order.status === "PAYMENT_COMPLETE" && (
          <button className={styles.cancleButton} onClick={handleCancelOrder}>
            주문취소
          </button>
        )}

        {order.status === "SHIPPING" && (
          <button onClick={handleTracking}>배송조회</button>
        )}

        {order.status === "DELIVERED" && (
          <>
            <Link
              className={styles.claimButton}
              href={`/mypage/claim/new?orderNumber=${order.orderNumber}`}
            >
              반품신청
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
