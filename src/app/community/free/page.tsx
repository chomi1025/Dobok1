import { prisma } from "@/lib/prisma";
import FreeBoardClientPage from "./page.client";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function FreeBoardPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const ITEMS_PER_PAGE = 15;
  const currentPage = Number(searchParams.page) || 1;

  const where = {
    type: "FREE",
    deletedAt: null,
  };

  const queryClient = new QueryClient();

  const fetchPosts = async () => {
    const [totalItems, posts] = await Promise.all([
      prisma.post.count({ where }),
      prisma.post.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: ITEMS_PER_PAGE,
        skip: (currentPage - 1) * ITEMS_PER_PAGE,
        include: {
          author: { select: { nickname: true } },
          _count: { select: { comments: true } },
        },
      }),
    ]);

    return { posts, total: totalItems };
  };

  await queryClient.prefetchQuery({
    queryKey: ["posts", "FREE", currentPage],
    queryFn: fetchPosts,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <FreeBoardClientPage
        pageSize={ITEMS_PER_PAGE}
        currentPage={currentPage}

      />
    </HydrationBoundary>
  );
}