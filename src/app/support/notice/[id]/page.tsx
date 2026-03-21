import { prisma } from "@/lib/prisma";
import Link from "next/link";
import NoticeDetailClientPage from "./page.client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

interface NoticeDetailProps {
  params: {
    id: string;
  };
}
export default async function NoticeDetailPage({ params }: NoticeDetailProps) {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "ADMIN";
  const noticeId = Number(params.id);
  const notice = await prisma.notice.findUnique({ where: { id: noticeId } });

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

  return <NoticeDetailClientPage notice={notice} isAdmin={isAdmin} />;
}
