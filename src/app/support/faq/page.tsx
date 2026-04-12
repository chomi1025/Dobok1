import { prisma } from "@/lib/prisma";
import FaqClientPage from "./page.client";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const revalidate = 60;

export default async function FaqPage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;

  const [totalCount, faqs] = await Promise.all([
    prisma.faq.count(),

    prisma.faq.findMany({
      orderBy: { sortOrder: "desc" },
      skip: skip,
      take: pageSize,
    }),
  ]);

  return (
    <FaqClientPage
      totalCount={totalCount}
      pageSize={pageSize}
      faqs={faqs}
      currentPage={currentPage}
    />
  );
}
