import { prisma } from "@/lib/prisma";
import EventsClientPage from "./page.client";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const ITEMS_PER_PAGE = 15;
  const currentPage = Number(searchParams.page) || 1;

  const where = {
    type: "EVENT",
    deletedAt: null,
  };

  const [totalItems, posts] = await Promise.all([
    prisma.post.count({ where }),
    prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: ITEMS_PER_PAGE,
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      include: {
        author: {
          select: { nickname: true },
        },
        _count: {
          select: { comments: true },
        },
      },
    }),
  ]);

  return (
    <EventsClientPage
      initialPosts={posts}
      total={totalItems}
      pageSize={ITEMS_PER_PAGE}
      currentPage={currentPage}
    />
  );
}
