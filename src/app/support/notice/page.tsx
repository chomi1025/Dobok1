import { authOptions } from "@/lib/auth/options";
import NoticeClientPage from "./page.client";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export default async function NoticeServerPage() {
  const [session, notice] = await Promise.all([
    getServerSession(authOptions),
    prisma.notice.findMany(),
  ]);

  const role = session?.user?.role ?? null;

  return <NoticeClientPage role={role} notice={notice} />;
}
