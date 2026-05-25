import { prisma } from "@/lib/prisma";
import EstimateEditClientPage from "./page.client";
import { notFound } from "next/navigation";

export interface ProductItem {
  id: number;
  name: string;
  thumbnail: string;
}

export default async function EstimateEditPage({
  params,
}: {
  params: { id: string };
}) {
  const estimate = await prisma.estimatePost.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      title: true,
      content: true,
      writer: true,
      phone: true,
      email: true,
      productId: true,
      product: {
        select: {
          id: true,
          name: true,
          thumbnail: true,
        },
      },
    },
  });

  if (!estimate) return notFound();

  return <EstimateEditClientPage estimate={estimate} />;
}
