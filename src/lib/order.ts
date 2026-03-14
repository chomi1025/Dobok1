import { prisma } from "@/lib/prisma";

export async function getOrderForClaim(orderId: string) {
  return prisma.order.findUnique({
    where: { id: Number(orderId) },
    include: {
      items: true,
      user: true,
    },
  });
}
