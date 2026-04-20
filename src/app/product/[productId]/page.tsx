import { prisma } from "@/lib/prisma";
import ProductDetailClientPage from "./page.client";
import { notFound } from "next/navigation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const product = await prisma.product.findUnique({
        where: { id: Number(productId) },
        include: {
          options: true,
          category: { include: { parent: true } },
        },
      });
      if (!product) return null;
      return JSON.parse(JSON.stringify(product));
    },
  });

  const product = queryClient.getQueryData(["product", productId]);

  if (!product) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailClientPage productId={productId} />
    </HydrationBoundary>
  );
}
