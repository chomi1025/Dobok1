import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminProductDetailClient from "./page.client";

export default async function AdminProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = Number(params.id);

  const [product, categories] = await prisma.$transaction([
    prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            discountType: true,
            discountValue: true,
          },
        },

        options: {
          orderBy: { id: "asc" },
        },
      },
    }),
    prisma.category.findMany({
      where: { parentId: null },
      include: {
        children: {
          select: {
            id: true,
            name: true,
            discountType: true,
            discountValue: true,
          },
        },
      },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  if (!product) {
    return notFound();
  }

  return (
    <AdminProductDetailClient
      product={product as any}
      categories={categories as any}
    />
  );
}
