import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";
console.log("카테고리 파일 로드됨!");
// 프리즈마에서 사용하는 타입 정의
type CategoryWithChildren = Prisma.CategoryGetPayload<{
  include: { children: true };
}>;

export type CategoryBase = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  sortOrder: number | null;
  imageUrl?: string | null;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  sortOrder: number | null;
  children?: Category[];
};

// (1차 카테고리만)
export const getMainCategories = async (): Promise<CategoryBase[]> => {
  return await prisma.category.findMany({
    where: { parentId: null },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      imageUrl: true,
      parentId: true,
      sortOrder: true,
    },
  });
};

//  (1차 + 2차)
export const getFullCategories = async (): Promise<{ grouped: Category[] }> => {
  const main: CategoryWithChildren[] = await prisma.category.findMany({
    where: { parentId: null },
    orderBy: { sortOrder: "asc" },
    include: {
      children: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  const grouped: Category[] = main.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    parentId: cat.parentId,
    sortOrder: cat.sortOrder,
    children: cat.children.map((child: any) => ({
      id: child.id,
      name: child.name,
      slug: child.slug,
      parentId: child.parentId,
      sortOrder: child.sortOrder,
      children: [],
    })),
  }));

  return { grouped };
};
