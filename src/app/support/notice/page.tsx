import { authOptions } from "@/lib/auth/options";
import NoticeClientPage from "./page.client";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}
export const dynamic = "force-dynamic";

export default async function NoticeServerPage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;

  const [session, totalCount, fixedNotices, normalNotices] = await Promise.all([
    getServerSession(authOptions),

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
  const role = session?.user?.role ?? "user";

  return (
    <NoticeClientPage
      role={role}
      allNotices={allNotices}
      total={totalCount}
      pageSize={pageSize}
      currentPage={currentPage}
    />
  );
}
