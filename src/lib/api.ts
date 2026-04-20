import { prisma } from "@/lib/prisma";

const IS_SERVER = typeof window === "undefined";

export const fetchProductPreview = async (
  type: "best" | "new",
  categoryId?: string,
) => {
  if (IS_SERVER) {
    return await prisma.product.findMany({
      where: {
        ...(type === "best" ? { isBest: true } : { isNew: true }),
        ...(categoryId && categoryId !== "all"
          ? { categoryId: categoryId }
          : {}),
      },
      take: 8,
      include: { options: true },
    });
  }

  const categoryParam =
    categoryId && categoryId !== "all" ? `&categoryId=${categoryId}` : "";
  const res = await fetch(`/api/products/preview?type=${type}${categoryParam}`);

  if (!res.ok) throw new Error("네트워크 응답 에러");
  return res.json();
};

export const fetchMainCategories = async () => {
  if (IS_SERVER) {
    const { getMainCategories } = await import("@/lib/category");
    return await getMainCategories();
  }
  const res = await fetch("/api/categories");
  return res.json();
};
