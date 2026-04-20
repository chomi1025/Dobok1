import { prisma } from "@/lib/prisma";
import NoticeEditClientPage from "./page.client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { redirect } from "next/navigation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface ParamsType {
  params: {
    id: string;
  };
}

export default async function NoticeEditPage({ params }: ParamsType) {
  const session = await getServerSession(authOptions);
  const noticeId = Number(params.id);

  if (session?.user?.role !== "ADMIN") {
    redirect("/support/notice");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notice", noticeId],
    queryFn: async () => {
      const notice = await prisma.notice.findUnique({
        where: {
          id: noticeId,
        },
      });

      return notice;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoticeEditClientPage noticeId={noticeId} />
    </HydrationBoundary>
  );
}
