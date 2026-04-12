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

  const allRawData = await prisma.notice.findMany({
    orderBy: { createdAt: "desc" },
  });

  const fixedNotices = allRawData.filter((n: NoticeRow) => n.isFixed);
  const normalNotices = allRawData.filter((n: NoticeRow) => !n.isFixed);

  const totalCount = normalNotices.length;
  const skip = (currentPage - 1) * pageSize;
  const pagedNormalNotices = normalNotices.slice(skip, skip + pageSize);

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
