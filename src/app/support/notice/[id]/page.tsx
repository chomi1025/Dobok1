import { prisma } from "@/lib/prisma";
import Link from "next/link";
import NoticeDetailClientPage from "./page.client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface NoticeDetailProps {
  params: {
    id: string;
  };
}
export default async function NoticeDetailPage({ params }: NoticeDetailProps) {
  const noticeId = Number(params.id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notice", noticeId],
    queryFn: async () => {
      const notice = await prisma.notice.findUnique({
        where: { id: noticeId },
      });
      if (!notice) return null;
      return notice;
    },
  });

  const state = dehydrate(queryClient);
  const notice = state.queries.find((q) => q.queryKey[0] === "notice")?.state
    .data;

  if (!notice) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        해당 공지를 찾을 수 없습니다.
        <br />
        <Link href="/support/notice">
          <button>목록으로 돌아가기</button>
        </Link>
      </div>
    );
  }

  return (
    <HydrationBoundary state={state}>
      <NoticeDetailClientPage noticeId={noticeId} />
    </HydrationBoundary>
  );
}
