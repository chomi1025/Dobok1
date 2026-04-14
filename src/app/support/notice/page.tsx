import NoticeClientPage from "./page.client";
import { prisma } from "@/lib/prisma";

interface NoticeRow {
  id: number;
  title: string;
  isFixed: boolean;
}

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const revalidate = 60;

export default async function NoticeServerPage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;

  const [fixedNotices, pagedNormalNotices, totalCount] = await Promise.all([
    prisma.notice.findMany({
      where: { isFixed: true },
      orderBy: { createdAt: "desc" },
    }),

    prisma.notice.findMany({
      where: { isFixed: false },
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: pageSize,
    }),

    prisma.notice.count({
      where: { isFixed: false },
    }),
  ]);

  const allNotices = [...fixedNotices, ...pagedNormalNotices];
  return (
    <NoticeClientPage
      allNotices={allNotices}
      total={totalCount}
      pageSize={pageSize}
      currentPage={currentPage}
    />
  );
}
