import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type CategoryWithChildren = Prisma.CategoryGetPayload<{
  include: { children: true };
}>;

export type CategoryBase = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  sortOrder: number | null;
  img?: string | null;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  sortOrder: number | null;
  children?: Category[];
};

export const getMainCategories = async (): Promise<CategoryBase[]> => {
  return await prisma.category.findMany({
    where: { parentId: null },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      parentId: true,
      sortOrder: true,
    },
  });
};

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
