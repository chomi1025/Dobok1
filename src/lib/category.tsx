import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

type CategoryWithChildren = Prisma.CategoryGetPayload<{
  include: { children: true };
}>;

export type Category = Prisma.CategoryGetPayload<{
  include: { children: true };
}>;

export async function getMainCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null,
        isVisible: true,
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

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("카테고리 불러오기 에러:", error);
    return [];
  }
}

export const getCategories = async (): Promise<{ grouped: Category[] }> => {
  const main: CategoryWithChildren[] = await prisma.category.findMany({
    where: { parentId: null, isVisible: true },
    orderBy: { sortOrder: "asc" },
    include: {
      children: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  const grouped: Category[] = main;
  return { grouped };
};
