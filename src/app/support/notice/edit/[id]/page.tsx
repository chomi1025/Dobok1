import { prisma } from "@/lib/prisma";
import NoticeEditClientPage from "./page.client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { redirect } from "next/navigation";

interface ParamsType {
  params: {
    id: string;
  };
}

export default async function NoticeEditPage({ params }: ParamsType) {
  const [session, notice] = await Promise.all([
    getServerSession(authOptions),
    prisma.notice.findUnique({
      where: {
        id: Number(params.id),
      },
    }),
  ]);

  if (session?.user?.role !== "ADMIN") {
    redirect("/support/notice");
  }

  return <NoticeEditClientPage notice={notice} />;
}
