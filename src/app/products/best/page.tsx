import { prisma } from "@/lib/prisma";
import BestProductClientPage from "./page.client";

export default async function BestProductPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
    include: {
      options: true,
      category: {
        include: {
          parent: true,
        },
      },
    },
  });

  return <BestProductClientPage products={products} />;
}
