import { authOptions } from "@/lib/auth/options";
import NoticeClientPage from "./page.client";
import { getServerSession } from "next-auth";

export default async function NoticeServerPage() {
  const session = await getServerSession(authOptions);

  const role = session?.user?.role ?? null;

  return <NoticeClientPage role={role} />;
}
