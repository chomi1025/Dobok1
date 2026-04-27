import { prisma } from "@/lib/prisma";
import CategoryClientPage from "./page.client";

export const metadata = {
  title: "도복일번지 | 카테고리 관리",
};

export default async function Page() {
  const categories = await prisma.category.findMany({
    where: {
      parentId: null,
    },
    include: {
      children: true,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  return <CategoryClientPage initialCategories={categories} />;
}
