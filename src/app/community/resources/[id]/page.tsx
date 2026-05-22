import { prisma } from "@/lib/prisma";
import ResourceDetailClientPage from "./page.client";
import { notFound } from "next/navigation";

export default async function ResourceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await prisma.resourcePost.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      author: {
        select: {
          nickname: true,
        },
      },
      attachments: true,
    },
  });

  if (!post) {
    notFound();
  }

  return <ResourceDetailClientPage post={post} />;
}
