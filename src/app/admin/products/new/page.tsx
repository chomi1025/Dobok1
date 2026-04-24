import { prisma } from "@/lib/prisma";
import AdminProductNewClient from "./page.client";

export default async function AdminProductNew() {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    include: { children: true },
    orderBy: { sortOrder: "asc" },
  });
  return <AdminProductNewClient categories={categories} />;
}
