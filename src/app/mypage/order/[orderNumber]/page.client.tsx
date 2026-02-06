"use client";
import Image from "next/image";
import * as O from "./style";
import Link from "next/link";
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
  date: string;
  status: string;
  items: OrderItem[];
  shipping: {
    name: string;
    phone: string;
    address: string;
  };
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
  const deliveryFee = 3000;
  const grandTotal = totalPrice + deliveryFee;
  console.log(order);

  return (
    <O.Wrapper>
      <O.Title>주문 상세</O.Title>

      {/* 주문 정보 */}
      <O.Card>
        <O.CardTitle>주문 정보</O.CardTitle>
        <O.InfoGrid>
          <O.Label>주문번호</O.Label>
          <O.Value>{order.orderNumber}</O.Value>

          <O.Label>주문일자</O.Label>
          <O.Value>{order.date}</O.Value>

          <O.Label>주문상태</O.Label>
          <O.Value>{ORDER_STATUS_LABEL[order.status] || order.status}</O.Value>
        </O.InfoGrid>
      </O.Card>

      <O.Divider />

      {/* 배송 정보 */}
      <O.Card>
        <O.CardTitle>배송 정보</O.CardTitle>
        <O.InfoGrid>
          <O.Label>수령인</O.Label>
          <O.Value>{order.shipping.name}</O.Value>

          <O.Label>연락처</O.Label>
          <O.Value>{order.shipping.phone}</O.Value>

          <O.Label>배송지</O.Label>
          <O.Address>
            {order.shipping?.address
              ? `${order.shipping.address.address} ${order.shipping.address.address2} (${order.shipping.address.zipCode})`
              : "주소 없음"}
          </O.Address>
        </O.InfoGrid>
      </O.Card>

      <O.Divider />

      {/* 상품 정보 */}
      <O.Card>
        <O.CardTitle>주문 상품</O.CardTitle>
        {order.items.map((item) => (
          <O.ProductCard key={item.id}>
            <Image
              src="/sample.png" // 또는 item.imageUrl
              alt={item.productName}
              width={80}
              height={80}
              style={{
                objectFit: "cover",
                background: "grey",
                borderRadius: "5px",
              }}
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

      {/* 결제 금액 */}
      <O.Card>
        <O.CardTitle>결제 금액</O.CardTitle>
        <O.PriceRow>
          <span>상품금액</span>
          <span>{totalPrice.toLocaleString()}원</span>
        </O.PriceRow>
        <O.PriceRow>
          <span>배송비</span>
          <span>{deliveryFee.toLocaleString()}원</span>
        </O.PriceRow>
        <O.PriceRow className="total">
          <span>총 결제금액</span>
          <span>{grandTotal.toLocaleString()}원</span>
        </O.PriceRow>
      </O.Card>

      {/* 버튼 */}
      <O.ButtonRow>
        <O.Button>문의하기</O.Button>

        {order.status === "PAYMENT_COMPLETE" && (
          <O.Button primary>주문취소</O.Button>
        )}

        {order.status === "SHIPPING" && <O.Button primary>배송조회</O.Button>}

        {order.status === "DELIVERED" && (
          <>
            <O.PrimaryButton
              onClick={() => router.push(`/mypage/review/${order.orderNumber}`)}
            >
              리뷰작성
            </O.PrimaryButton>
            <O.Button>반품신청</O.Button>
          </>
        )}
      </O.ButtonRow>
    </O.Wrapper>
  );
}
