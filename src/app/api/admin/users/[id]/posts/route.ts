import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  },
) {
  const userId = Number(params.id);

  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },

    select: {
      id: true,
      title: true,
      viewCount: true,
      createdAt: true,
      type: true,
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 20,
  });

  return NextResponse.json(posts);
}
