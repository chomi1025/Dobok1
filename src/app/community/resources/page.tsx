import { prisma } from "@/lib/prisma";
import ResourcesClientPage from "./page.client";

export const metadata = {
  title: "도장 운영 자료실 | 도복일번지",

  description:
    "도장 운영에 필요한 품새 영상, 알림장 양식, 출석부, 안내문, 홍보 자료 등 다양한 실전 자료를 한곳에서 확인해보세요.",

  keywords: [
    "도복일번지",
    "도장 운영 자료실",
    "품새 영상",
    "도장 운영",
    "태권도 자료실",
    "무도 자료",
    "알림장 양식",
    "출석부 양식",
    "도장 문서",
    "도장 운영 노하우",
  ],

  openGraph: {
    title: "도장 운영 자료실 | 도복일번지",

    description:
      "품새 영상부터 운영 양식, 실전 문서 자료까지. 도장 운영에 필요한 다양한 자료를 확인해보세요.",

    url: "https://dobok1.vercel.app/community/resources",

    siteName: "도복일번지",

    locale: "ko_KR",

    type: "website",
  },
};

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const ITEMS_PER_PAGE = 15;
  const currentPage = Number(searchParams.page) || 1;

  const [totalItems, posts] = await Promise.all([
    prisma.resourcePost.count(),
    prisma.resourcePost.findMany({
      orderBy: { createdAt: "desc" },
      take: ITEMS_PER_PAGE,
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      include: {
        author: {
          select: { nickname: true },
        },
        attachments: true,
      },
    }),
  ]);

  return (
    <ResourcesClientPage
      initialPosts={posts}
      total={totalItems}
      pageSize={ITEMS_PER_PAGE}
      currentPage={currentPage}
    />
  );
}
