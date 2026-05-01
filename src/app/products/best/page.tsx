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
        options: true,
        category: { select: { name: true, slug: true } },
      },
    }),
  ]);

  return (
    <BestProductClientPage
      currentPage={currentPage}
      pageSize={pageSize}
      products={products}
      totalItems={totalItems}
    />
  );
}
