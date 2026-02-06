import { PrismaClient, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();
  const product = await prisma.product.findFirst();

  if (!user || !product) {
    throw new Error("유저 또는 상품이 없습니다");
  }

  const order = await prisma.order.create({
    data: {
      orderNumber: `TEST-${Date.now()}`,
      createdAt: new Date(),
      total: product.price,
      status: OrderStatus.DELIVERED, // 👈 버튼 테스트 핵심
      userId: user.id,
      items: {
        create: [
          {
            productId: product.id,
            productName: product.name,
            unitPrice: product.price,
            quantity: 1,
            totalPrice: product.price,
          },
        ],
      },
    },
  });

  console.log("✅ 테스트 주문 생성 완료:", order.orderNumber);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
