import { prisma } from "@/lib/prisma";
import ProductDetailClientPage from "./page.client";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

export default async function ProductDetailPage({
  params,
}: {
  params: {
    productId: string;
  };
}) {
  const { productId } = params;

  const [session, product] = await Promise.all([
    await getServerSession(authOptions),
    prisma.product.findUnique({
      where: { id: Number(productId) },
      include: {
        options: true,
        category: {
          include: { parent: true },
        },
      },
    }),
  ]);

  if (!product) {
    notFound();
  }

  return <ProductDetailClientPage product={product} session={session} />;
}
