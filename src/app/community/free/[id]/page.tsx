import { prisma } from "@/lib/prisma";
import PostDetailClientPage from "./page.client";
import { notFound } from "next/navigation";

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params.id),
      type: "FREE",
    },
    select: {
      id: true,
      title: true,
      content: true,
      viewCount: true,
      createdAt: true,
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          authorId: true,
          author: {
            select: {
              id: true,
              nickname: true,
            },
          },
        },
      },
      author: {
        select: {
          nickname: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  return <PostDetailClientPage post={post} />;
}
