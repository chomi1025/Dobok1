import { prisma } from "@/lib/prisma";
import BestProductClientPage from "./page.client";

export default async function BestProductPage() {
  // 상품목록 가져오깅 ~
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  return <BestProductClientPage products={products} />;
}
