import { getServerSession } from "next-auth";
import NoticeNewClientPage from "./page.client";
import { authOptions } from "@/lib/auth/options";
import { redirect } from "next/navigation";

export default async function NoticeNewPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    redirect("/support/notice");
  }

  return <NoticeNewClientPage />;
}
