import { Metadata } from "next";
import { getMainCategories } from "@/lib/category";
import { prisma } from "@/lib/prisma";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import HomeClientPage from "./page.client";
import { makeQueryClient } from "@/lib/query.client";

export const metadata: Metadata = {
  title: "도복일번지",
  description: "스포츠용품,도복 전문 도복일번지 입니다!",
};

export const revalidate = 3600;

export default async function HomePage() {
  const queryClient = makeQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["mainCategories"],
      queryFn: getMainCategories,
    }),
    queryClient.prefetchQuery({
      queryKey: ["bestProducts"],
      queryFn: () =>
        prisma.product.findMany({
          where: { isBest: true },
          take: 8,
          include: { options: true },
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["newProducts"],
      queryFn: () =>
        prisma.product.findMany({
          where: { isNew: true },
          take: 8,
          include: { options: true },
        }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClientPage />
    </HydrationBoundary>
  );
}
