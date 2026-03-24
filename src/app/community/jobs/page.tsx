import { prisma } from "@/lib/prisma";
import JobsClientPage from "./page.client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { Metadata } from "next";

interface PageProps {
  searchParams: { page?: string; type?: string };
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const isSeeking = searchParams.type?.toUpperCase() === "SEEKING";

  return {
    title: isSeeking ? "구직 게시판 | 도복일번지" : "구인 게시판 | 도복일번지",
    description: isSeeking
      ? "도복일번지에서 실력 있는 선생님들의 이력서를 확인하세요. 우리 도장에 꼭 맞는 인재를 찾을 수 있습니다."
      : "도복일번지 커뮤니티에서 최신 구인 정보를 확인하세요. 사장님과 구직자를 잇는 가장 빠른 방법!",
    openGraph: {
      title: isSeeking
        ? "실력 있는 사범님들 여기 다 모였다! | 도복일번지"
        : "우리 도장 사범님 구하기 | 도복일번지",
      description: isSeeking
        ? "준비된 사범님들의 프로필을 확인하고 바로 컨택해 보세요."
        : "도복일번지에서 엄선된 구인 정보를 확인하세요.",
      type: "website",
    },
  };
}

export default async function JobsPage({ searchParams }: PageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const currentType =
    (searchParams.type?.toUpperCase() as "HIRING" | "SEEKING") || "HIRING";
  const pageSize = 10;

  const [session, total, jobs] = await Promise.all([
    getServerSession(authOptions),
    prisma.post.count({
      where: { type: "JOB", jobType: currentType },
    }),
    prisma.post.findMany({
      where: { type: "JOB", jobType: currentType },
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
  console.log(jobs);
  const currentUser = session?.user;
  return (
    <JobsClientPage
      jobs={jobs}
      total={total}
      user={currentUser}
      pageSize={pageSize}
      currentPage={currentPage}
      initialType={currentType}
    />
  );
}
