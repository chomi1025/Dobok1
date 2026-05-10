import { prisma } from "@/lib/prisma";
import JobsClientPage from "./page.client";
import { Metadata } from "next";
import { Post } from "@prisma/client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface PageProps {
  searchParams: { page?: string; type?: string };
}

type PostWithAuthor = Post & {
  author?: {
    name: string;
    nickname?: string | null;
  };
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const type = searchParams.type?.toUpperCase();

  let title = "무도인 구인구직 | 도복일번지 - 사범님·관장님 매칭";
  let description =
    "태권도, 유도, 합기도 등 전국 무술 도장의 최신 구인공고와 사범님 구직 정보를 도복일번지에서 확인하세요.";

  if (type === "HIRING") {
    title = "사범님 모시기 (구인) | 도복일번지";
    description =
      "전국의 실력 있는 사범님들을 찾으시나요? 도복일번지 구인 게시판에서 우리 도장에 꼭 맞는 인재를 만나보세요.";
  }

  if (type === "SEEKING") {
    title = "사범님 구직 (이력서) | 도복일번지";
    description =
      "새로운 도장을 찾으시는 사범님들! 도복일번지 구직 게시판에 이력서를 등록하고 딱 맞는 도장의 제안을 받아보세요.";
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "도복일번지",
      locale: "ko_KR",
      type: "website",
    },
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
    deletedAt: null,
  };

  if (currentType === "HIRING" || currentType === "SEEKING") {
    whereClause.jobType = currentType;
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["jobs", currentType, currentPage],
    queryFn: async () => {
      const whereClause: any = {
        type: "JOB",
        deletedAt: null,
      };

      if (currentType !== "ALL") {
        whereClause.jobType = currentType;
      }

      const [total, jobs] = await Promise.all([
        prisma.post.count({ where: whereClause }),
        prisma.post.findMany({
          where: whereClause,
          orderBy: { createdAt: "desc" },
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
          include: {
            author: { select: { name: true, nickname: true } },
          },
        }),
      ]);

      const formattedJobs = jobs.map((job: any) => ({
        ...job,
        type: job.jobType,
        authorNickName: job.authorNickName || "개인",
      }));

      return { jobs: formattedJobs, total };
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JobsClientPage
        pageSize={pageSize}
        currentPage={currentPage}
        initialType={currentType as any}
      />
    </HydrationBoundary>
  );
}
