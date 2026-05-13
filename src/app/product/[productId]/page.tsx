import { prisma } from "@/lib/prisma";
import ProductDetailClientPage from "./page.client";

export default async function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(productId),
    },
    include: {
      options: {
        where: {
          status: {
            not: "HIDDEN",
          },
        },
      },

      category: {
        include: {
          parent: true,
        },
      },
    },
  });

  return <ProductDetailClientPage product={product} />;
}
