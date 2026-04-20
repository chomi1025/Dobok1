// lib/api.ts
import { prisma } from "@/lib/prisma";
import { getMainCategories } from "@/lib/category";

const IS_SERVER = typeof window === "undefined";

export const fetchMainCategories = async () => {
  if (IS_SERVER) return await getMainCategories();
  const res = await fetch("/api/categories");
  return res.json();
};

export const fetchBestProducts = async () => {
  if (IS_SERVER) {
    return await prisma.product.findMany({
      where: { isBest: true },
      take: 8,
      include: { options: true },
    });
  }
  const res = await fetch("/api/products/best");
  return res.json();
};

export const fetchNewProducts = async () => {
  if (IS_SERVER) {
    return await prisma.product.findMany({
      where: { isNew: true },
      take: 8,
      include: { options: true },
    });
  }
  const res = await fetch("/api/products/new");
  return res.json();
};
