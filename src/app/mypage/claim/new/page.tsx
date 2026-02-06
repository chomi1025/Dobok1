// app/mypage/claims/[orderId]/page.tsx
import { getOrderForClaim } from "@/lib/order";
import ClaimNewClientPage from "./page.client";
import { notFound } from "next/navigation";

interface Props {
  searchParams: { orderId: string }; // 쿼리 스트링으로 받음
}

export default async function ClaimNewPage({ searchParams }: Props) {
  const { orderId } = searchParams;

  if (!orderId) {
    throw new Error("orderId가 필요합니다");
  }

  const order = await getOrderForClaim(orderId);

  if (!order) notFound();

  // 배송완료 체크
  if (order.status !== "DELIVERED") {
    throw new Error("반품 가능한 주문이 아닙니다");
  }

  return <ClaimNewClientPage order={order} />;
}
