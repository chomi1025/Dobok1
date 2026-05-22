import { prisma } from "@/lib/prisma";
import EventDetailClientPage from "./page.client";
import { notFound } from "next/navigation";

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params.id),
      type: "EVENT",
    },
    select: {
      id: true,
      title: true,
      content: true,
      viewCount: true,
      createdAt: true,
      authorNickname: true,
      authorId: true,

      eventDate: true,
      city: true,
      district: true,
      eventVenue: true,

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
    },
  });

  if (!post) {
    notFound();
  }

  return <EventDetailClientPage post={post} />;
}
