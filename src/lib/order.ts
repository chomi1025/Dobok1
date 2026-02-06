// lib/order.ts
import { prisma } from "@/lib/prisma";

export async function getOrderForClaim(orderId: string) {
  return prisma.order.findUnique({
    where: { id: Number(orderId) }, // string → number
    include: {
      items: true, // 그냥 items 필드 가져오기
      user: true, // 배송 정보 위해
    },
  });
}
