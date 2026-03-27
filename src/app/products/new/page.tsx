import ProductPageComponent from "@/components/product/new_bestPage/page";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "신제품 | 도복일번지",
  description: "도복일번지에 갓 들어온 따끈따끈한 신상 도복들을 만나보세요!",
};

const title = {
  name: "신제품",
  contents: "도복일번지에서 새롭게 출시한 제품을 만나보세요",
};

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const params = searchParams;
  const currentPage = Number(params.page) || 1;
  const pageSize = 12;

  const [totalItems, products] = await Promise.all([
    prisma.product.count({
      where: { isNew: true },
    }),
    prisma.product.findMany({
      where: { isNew: true },
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

  console.log(products);
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
