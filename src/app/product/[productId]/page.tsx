import { prisma } from "@/lib/prisma";
import ProductDetailClientPage from "./page.client";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: {
    productId: string;
  };
}) {
  const { productId } = params;

  const product = await prisma.product.findUnique({
    where: { id: Number(productId) },
    include: {
      options: true,
      category: {
        include: { parent: true },
      },
    },
  });

  if (!product) {
    notFound();
  }
  return <ProductDetailClientPage product={product} />;
}
