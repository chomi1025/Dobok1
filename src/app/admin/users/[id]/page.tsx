import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import UserDetailClientPage from "./page.client";

export default async function UserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
    include: {
      _count: {
        select: {
          orders: true,
          posts: true,
          comments: true,
        },
      },
      orders: { take: 5, orderBy: { createdAt: "desc" } },
    },
  });

  if (!user) return notFound();

  return <UserDetailClientPage user={user} />;
}
