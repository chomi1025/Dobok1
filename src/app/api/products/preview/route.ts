import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type CategoryWithChildren = Prisma.CategoryGetPayload<{
  include: { children: true };
}>;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const categoryId = searchParams.get("categoryId");

  let categoryIds: number[] = [];

  if (categoryId && categoryId !== "all") {
    const targetId = Number(categoryId);

    const categoryWithChildren: CategoryWithChildren | null =
      await prisma.category.findUnique({
        where: { id: targetId },
        include: { children: true },
      });

    if (categoryWithChildren) {
      categoryIds = [
        categoryWithChildren.id,
        ...(categoryWithChildren.children?.map((child) => child.id) || []),
      ];
    }
  }

  const products = await prisma.product.findMany({
    where: {
      ...(type === "best" ? { isBest: true } : { isNew: true }),
      ...(categoryIds.length > 0 && {
        categoryId: { in: categoryIds },
      }),
    },
    take: 8,
    include: { options: true },
  });

  return Response.json(products);
}
