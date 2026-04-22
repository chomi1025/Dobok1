import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { prisma } from "@/lib/prisma";
import BestProductClientPage from "./page.client";

export const metadata = {
  title: "베스트 상품 | 도복일번지",
  description: "도복일번지에서 가장 사랑받는 베스트 상품들을 만나보세요.",
};

export const revalidate = 60;

export default async function BestProductPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 12;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products", "best", currentPage],
    queryFn: async () => {
      const skip = (currentPage - 1) * pageSize;
      const [totalItems, products] = await Promise.all([
        prisma.product.count({ where: { isBest: true } }),
        prisma.product.findMany({
          where: { isBest: true },
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
      <BestProductClientPage currentPage={currentPage} pageSize={pageSize} />
    </HydrationBoundary>
  );
}
