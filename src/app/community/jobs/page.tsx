import { prisma } from "@/lib/prisma";
import JobsClientPage from "./page.client";
import { Metadata } from "next";

interface PageProps {
  searchParams: { page?: string; type?: string };
}

interface PageProps {
  searchParams: { page?: string; type?: string };
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const type = searchParams.type?.toUpperCase();

  let title = "구인·구직 게시판 | 도복일번지";
  if (type === "HIRING") title = "구인 게시판 | 도복일번지";
  if (type === "SEEKING") title = "구직 게시판 | 도복일번지";

  return {
    title,
    description: "도복일번지 커뮤니티에서 최신 구인·구직 정보를 확인하세요.",
  };
}

export default async function JobsPage({ searchParams }: PageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 10;

  const rawType = searchParams.type?.toUpperCase();

  const currentType =
    rawType === "HIRING" || rawType === "SEEKING" ? rawType : "ALL";

  const whereClause: any = {
    type: "JOB",
  };

  if (currentType === "HIRING" || currentType === "SEEKING") {
    whereClause.jobType = currentType;
  }

  const [total, jobs] = await Promise.all([
    prisma.post.count({
      where: whereClause,
    }),
    prisma.post.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      include: {
        author: {
          select: {
            name: true,
            isDeleted: true,
          },
        },
      },
    }),
  ]);

  return (
    <JobsClientPage
      jobs={jobs as any}
      total={total}
      pageSize={pageSize}
      currentPage={currentPage}
      initialType={currentType as any}
    />
  );
}
