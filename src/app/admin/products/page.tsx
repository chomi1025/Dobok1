import AdminProductClientPage from "./page.client";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "관리자 페이지 - 상품관리",
  description:
    "관리자페이지-상품관리입니다. 관리자는 이 페이지에서 새로운 상품을 추가하고,수정하고,삭제할 수 있습니다",
};

const ITEMS_PER_PAGE = 10;

export default async function AdminProductPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    status?: string;
    mainId?: string;
    subId?: string;
    q?: string;
  };
}) {
  const { page, status, mainId, subId, q } = searchParams;
  const currentPage = Number(page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const where: any = {};

  // 키워드
  if (q) {
    where.name = { contains: q, mode: "insensitive" };
  }

  // 카테고리
  if (subId) {
    where.categoryId = Number(subId);
  } else if (mainId) {
    where.category = { parentId: Number(mainId) };
  }

  if (status && status !== "ALL") {
    where.options = {
      some: { status: status },
    };
  }

  const [rawProducts, totalCount, categories] = await prisma.$transaction([
    // 상품검색
    prisma.product.findMany({
      where,
      skip,
      take: ITEMS_PER_PAGE,
      orderBy: { createdAt: "desc" },
      include: {
        category: {
          include: {
            parent: true,
          },
        },
        options: true,
      },
    }),

    // 상품갯수계산 후 페이지네이션
    prisma.product.count({ where }),

    // 카테고리
    prisma.category.findMany({
      where: { parentId: null },
      include: { children: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return (
    <AdminProductClientPage
      products={rawProducts as any}
      totalCount={totalCount}
      currentPage={currentPage}
      pageSize={ITEMS_PER_PAGE}
      categories={categories as any}
    />
  );
}
