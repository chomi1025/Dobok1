// app/lib/fetchCategories.ts
import { prisma } from "@/lib/prisma";

export async function fetchCategories() {
  return prisma.category.findMany({
    where: { parentId: null },
    include: { children: { orderBy: { sortOrder: "asc" } } },
    orderBy: { sortOrder: "asc" },
  });
}
