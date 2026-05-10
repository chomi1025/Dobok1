import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PageClient from "./page.client";
import { prisma } from "@/lib/prisma";
import { getCategories } from "@/lib/category";

export default async function CategoryPage({ params, searchParams }: any) {
  const slug = params.slug || [];
  const mainSlug = slug[0] || "";
  const subSlug = slug[1] || "all";

  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const pageSize = 12;

  const queryClient = new QueryClient();
  const categories = await getCategories();

  await queryClient.prefetchQuery({
    queryKey: ["products", "category", mainSlug, subSlug, currentPage],
    queryFn: async () => {
      const productWhere =
        subSlug !== "all"
          ? { category: { slug: subSlug } }
          : { category: { parent: { slug: mainSlug } } };

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where: productWhere,
          include: {
            category: { include: { parent: true } },
            options: true,
          },
          orderBy: { createdAt: "desc" },
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        }),
        prisma.product.count({ where: productWhere }),
      ]);
      return { products, total };
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageClient
        categories={categories.grouped}
        mainSlug={mainSlug}
        subSlug={subSlug}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </HydrationBoundary>
  );
}
