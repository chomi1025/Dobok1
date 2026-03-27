import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

type CategoryWithChildren = Prisma.CategoryGetPayload<{
  include: { children: true };
}>;

export type Category = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  sortOrder: number | null;
  children?: Category[];
};

export async function getMainCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null,
      },
      include: {
        children: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
      orderBy: {
        sortOrder: "asc",
      },
    });
    return categories;
  } catch (error) {
    console.error("카테고리 불러오기 에러:", error);
    return [];
  }
}

export const getCategories = async (): Promise<{ grouped: Category[] }> => {
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
