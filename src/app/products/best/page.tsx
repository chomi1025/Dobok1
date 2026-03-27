import { prisma } from "@/lib/prisma";
import ProductPageComponent from "@/components/product/new_bestPage/page";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

export const metadata: Metadata = {
  title: "베스트 상품 | 도복일번지",
  description: "도복일번지에서 가장 사랑받는 베스트 상품들을 만나보세요.",
};

const title = {
  name: "베스트 상품",
  contents: "도복일번지의 베스트 상품을 모아왔어요",
};

export default async function BestProductPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const params = searchParams;
  const currentPage = Number(params.page) || 1;
  const pageSize = 12;

  const [totalItems, products] = await Promise.all([
    prisma.product.count({
      where: { isBest: true },
    }),

    prisma.product.findMany({
      where: { isBest: true },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        name: true,
        description: true,
        thumbnail: true,
        isNew: true,
        isCustomizable: true,
        options: {
          select: {
            id: true,
            price: true,
            size: true,
            color: true,
          },
        },
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    }),
  ]);

  return (
    <ProductPageComponent
      title={title}
      products={products}
      totalItems={totalItems}
      currentPage={currentPage}
      pageSize={pageSize}
    />
  );
}
