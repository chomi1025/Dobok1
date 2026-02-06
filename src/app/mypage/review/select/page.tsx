"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import * as O from "./style";

interface OrderItem {
  id: number;
  productName: string;
  img: string;
  reviewWritten: boolean;
}

interface OrderDetail {
  id: number;
  orderNumber: string;
  items: OrderItem[];
}

export default function ReviewSelectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderNumber = searchParams.get("orderNumber");

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderNumber) {
      setLoading(false); // 🔥 이거 중요
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/mypage/orders/${orderNumber}`, {
          credentials: "include",
        });
        const data = await res.json();

        setOrder(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  if (loading) return <div>로딩중...</div>;
  if (!order) return <div>주문 정보를 불러올 수 없습니다.</div>;

  const reviewableItems = order.items.filter((item) => !item.reviewWritten);

  return (
    <O.Wrapper>
      <O.Title>리뷰 작성할 상품 선택</O.Title>

      <O.Card>
        <O.InfoGrid>
          <O.Label>주문번호</O.Label>
          <O.Value>{order.orderNumber}</O.Value>
        </O.InfoGrid>
      </O.Card>

      <O.Divider />

      {reviewableItems.length === 0 ? (
        <O.EmptyBox>작성 가능한 리뷰가 없습니다.</O.EmptyBox>
      ) : (
        <O.Card>
          <O.CardTitle>상품 목록</O.CardTitle>

          {reviewableItems.map((item) => (
            <O.ProductCard
              key={item.id}
              onClick={() =>
                router.push(`/mypage/review/new?orderItemId=${item.id}`)
              }
            >
              <Image
                src={item.img ?? "/sample.png"}
                alt={item.productName}
                width={80}
                height={80}
              />

              <O.ProductInfo>
                <O.ProductName>{item.productName}</O.ProductName>
                <O.ReviewHint>리뷰 작성하기</O.ReviewHint>
              </O.ProductInfo>
            </O.ProductCard>
          ))}
        </O.Card>
      )}
    </O.Wrapper>
  );
}
