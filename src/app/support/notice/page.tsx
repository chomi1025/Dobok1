import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoticeClientPage from "./page.client";
import { prisma } from "@/lib/prisma";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const revalidate = 60;

export default async function NoticeServerPage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 10;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notices", currentPage],
    queryFn: async () => {
      const skip = (currentPage - 1) * pageSize;
      const [fixedNotices, pagedNormalNotices, totalCount] = await Promise.all([
        prisma.notice.findMany({
          where: { isFixed: true },
          orderBy: { createdAt: "desc" },
        }),
        prisma.notice.findMany({
          where: { isFixed: false },
          orderBy: { createdAt: "desc" },
          skip,
          take: pageSize,
        }),
        prisma.notice.count({ where: { isFixed: false } }),
      ]);
      return {
        allNotices: [...fixedNotices, ...pagedNormalNotices],
        total: totalCount,
      };
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoticeClientPage pageSize={pageSize} currentPage={currentPage} />
    </HydrationBoundary>
  );
}
