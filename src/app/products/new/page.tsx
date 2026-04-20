import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import NewProductClientPage from "./page.client";

export const metadata: Metadata = {
  title: "신제품 | 도복일번지",
  description: "도복일번지에 갓 들어온 따끈따끈한 신상 도복들을 만나보세요!",
};

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 12;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products", "new", currentPage],
    queryFn: async () => {
      const skip = (currentPage - 1) * pageSize;
      const [totalItems, products] = await Promise.all([
        prisma.product.count({ where: { isNew: true } }),
        prisma.product.findMany({
          where: { isNew: true },
          orderBy: { createdAt: "desc" },
          skip,
          take: pageSize,
          select: {
            id: true,
            name: true,
            description: true,
            thumbnail: true,
            isNew: true,
            isCustomizable: true,
            options: {
              select: { id: true, price: true, size: true, color: true },
            },
            category: { select: { name: true, slug: true } },
          },
        }),
      ]);
      return { products, totalItems };
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewProductClientPage currentPage={currentPage} pageSize={pageSize} />
    </HydrationBoundary>
  );
}
