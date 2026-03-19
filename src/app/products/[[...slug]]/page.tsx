import { getCategories } from "@/lib/category";
import PageClient from "./page.client";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type CategoryWithChildren = Prisma.CategoryGetPayload<{
  include: { children: true };
}>;

export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: {
    category: {
      include: { parent: true };
    };
  };
}>;

interface PageProps {
  params: { slug?: string[] };
  searchParams: { page?: string };
}

export default async function Page({ params, searchParams }: PageProps) {
  const slug = params.slug || [];
  const mainSlug = slug[0] || "";
  const subSlugFromUrl = slug[1];

  // 페이지네이션
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const pageSize = 12;
  const skip = (currentPage - 1) * pageSize;

  const productWhere: Prisma.ProductWhereInput = subSlugFromUrl
    ? {
        category: { slug: subSlugFromUrl },
      }
    : {
        category: { parent: { slug: mainSlug } },
      };

  const [categories, products, totalProducts] = await Promise.all([
    prisma.category.findMany({
      where: { parentId: null },
      include: { children: { orderBy: { sortOrder: "asc" } } },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.product.findMany({
      where: productWhere,
      include: { category: { include: { parent: true } } },
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: pageSize,
    }),
    prisma.product.count({ where: productWhere }),
  ]);

  return (
    <PageClient
      categories={categories}
      products={products as any}
      mainSlug={mainSlug}
      subSlug={subSlugFromUrl || "all"}
      total={totalProducts}
      pageSize={pageSize}
      currentPage={currentPage}
    />
  );
}
