import { prisma } from "@/lib/prisma";
import FreeEditClientPage from "./page.client";

export default async function FreeEditPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
  });

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return <FreeEditClientPage post={post} />;
}
