import { prisma } from "@/lib/prisma";
import JobsDetailClientPage from "./page.client";

interface Props {
  params: {
    id: number;
  };
}

export default async function JobsDetailPage({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: {
      type: "JOB",
      id: Number(params.id),
    },
  });

  return <JobsDetailClientPage post={post} />;
}
