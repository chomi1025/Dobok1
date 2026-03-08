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
  console.log(productId);

  const product = await prisma.product.findUnique({
    where: { id: Number(productId) }, // ID가 숫자라면 변환 필수!
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
