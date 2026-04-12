import NoticeClientPage from "./page.client";
import { prisma } from "@/lib/prisma";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const revalidate = 60;

export default async function NoticeServerPage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;

  const [totalCount, fixedNotices, normalNotices] = await Promise.all([
    prisma.notice.count({ where: { isFixed: false } }),

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
  ]);

  const allNotices = [...fixedNotices, ...normalNotices];

  return (
    <NoticeClientPage
      allNotices={allNotices}
      total={totalCount}
      pageSize={pageSize}
      currentPage={currentPage}
    />
  );
}
