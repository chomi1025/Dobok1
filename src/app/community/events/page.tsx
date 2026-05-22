import { prisma } from "@/lib/prisma";
import EventsClientPage from "./page.client";

export const metadata = {
  title: " 대회·행사 정보 | 도복일번지",
  description:
    "도복일번지 커뮤니티 대회·행사 정보 게시판입니다. 태권도, 유도, 합기도, 주짓수 등 전국 무도 대회 일정과 세미나, 행사 소식을 빠르게 확인해보세요.",
  keywords: [
    "도복일번지",
    "도복일번지 커뮤니티",
    "대회 행사 정보",
    "무도 대회",
    "태권도 대회",
    "주짓수 대회",
    "유도 대회",
    "합기도 행사",
    "무술 세미나",
    "격투기 행사",
  ],
  openGraph: {
    title: "도복일번지 커뮤니티 - 대회·행사 정보",
    description:
      "전국 무도 대회와 세미나, 각종 행사 정보를 빠르게 확인하고 참여해보세요.",
    url: "https://dobok1.vercel.app/community/events",
    siteName: "도복일번지",
    locale: "ko_KR",
    type: "website",
  },
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const ITEMS_PER_PAGE = 15;
  const currentPage = Number(searchParams.page) || 1;

  const where = {
    type: "EVENT",
    deletedAt: null,
  };

  const [totalItems, posts] = await Promise.all([
    prisma.post.count({ where }),
    prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: ITEMS_PER_PAGE,
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      include: {
        author: {
          select: { nickname: true },
        },
        _count: {
          select: { comments: true },
        },
      },
    }),
  ]);

  return (
    <EventsClientPage
      initialPosts={posts}
      total={totalItems}
      pageSize={ITEMS_PER_PAGE}
      currentPage={currentPage}
    />
  );
}
