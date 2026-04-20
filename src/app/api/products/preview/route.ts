import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type CategoryWithChildren = Prisma.CategoryGetPayload<{
  include: { children: true };
}>;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const categoryId = searchParams.get("categoryId");

  console.log(`2. 파라미터 확인 - type: ${type}, categoryId: ${categoryId}`);

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

  console.log("3. Prisma 쿼리 직전");
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
  console.log("4. Prisma 쿼리 완료", products.length);

  return Response.json(products);
}
