import { Metadata } from "next";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import HomeClientPage from "./page.client";
import { getQueryClient } from "@/lib/query.client";
import { fetchMainCategories, fetchProductPreview } from "@/lib/api";

export const metadata: Metadata = {
  title: "도복일번지",
  description: "스포츠용품,도복 전문 도복일번지 입니다!",
};

//export const revalidate = 3600;

export default async function HomePage() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["mainCategories"],
      queryFn: fetchMainCategories,
    }),
    queryClient.prefetchQuery({
      queryKey: ["products", "best", "all"],
      queryFn: () => fetchProductPreview("best"),
    }),
    queryClient.prefetchQuery({
      queryKey: ["products", "new", "all"],
      queryFn: () => fetchProductPreview("new"),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClientPage />
    </HydrationBoundary>
  );
}
