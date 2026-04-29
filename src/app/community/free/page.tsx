import { prisma } from "@/lib/prisma";
import FreeBoardClientPage from "./page.client";

export const metadata = {
  title: "자유게시판 | 도복일번지 - 무도인들의 소통 공간",
  description:
    "태권도, 유도, 합기도 등 모든 무도인들이 자유롭게 이야기를 나누는 공간입니다. 도장 운영 고민부터 일상 이야기까지 함께 나눠보세요!",
  keywords: [
    "도복1번지",
    "자유게시판",
    "무술 커뮤니티",
    "태권도",
    "유도",
    "합기도",
    "검도",
    "줄넘기",
    "헬스",
    "수영",
    "PT",
    "관장님 커뮤니티",
    "사범님 소통",
  ],
  openGraph: {
    title: "자유게시판 | 도복1번지",
    description: "지금 도복1번지에서 무도인들의 생생한 이야기를 확인해보세요.",
    url: "https://dobok1.com/community/free",
    siteName: "도복1번지",
    images: [
      {
        url: "/images/og-freeboard.png",
        width: 1200,
        height: 630,
        alt: "도복1번지 자유게시판",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "자유게시판 | 도복1번지",
    description: "무도인들의 자유로운 소통 공간, 도복1번지 커뮤니티!",
  },
};

export default async function FreeBoardPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const ITEMS_PER_PAGE = 15;
  const currentPage = Number(searchParams.page) || 1;

  const [totalItems, posts] = await Promise.all([
    prisma.post.count({
      where: { type: "FREE" },
    }),
    prisma.post.findMany({
      where: { type: "FREE" },
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
    <FreeBoardClientPage
      initialPosts={posts}
      total={totalItems}
      pageSize={ITEMS_PER_PAGE}
      currentPage={currentPage}
    />
  );
}
