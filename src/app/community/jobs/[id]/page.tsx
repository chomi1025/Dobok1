import { prisma } from "@/lib/prisma";
import JobsDetailClientPage from "./page.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface Props {
  params: {
    id: string;
  };
}

export default async function JobsDetailPage({ params }: Props) {
  const queryClient = new QueryClient();
  const postId = Number(params.id);

  await queryClient.prefetchQuery({
    queryKey: ["jobs", postId],
    queryFn: async () => {
      const post = await prisma.post.findUnique({
        where: { id: postId, type: "JOB" },
        include: {
          author: {
            select: {
              nickname: true,
              email: true,
              phone: true,
            },
          },
        },
      });

      if (!post) return null;

      await prisma.post.update({
        where: { id: postId },
        data: { viewCount: { increment: 1 } },
      });

      return post;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JobsDetailClientPage postId={postId} />
    </HydrationBoundary>
  );
}
