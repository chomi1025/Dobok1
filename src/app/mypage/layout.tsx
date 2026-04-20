import { getServerSession } from "next-auth";
import MypageClientLayout from "./layout.client";

export const dynamic = "force-dynamic";

export default async function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return <MypageClientLayout session={session}>{children}</MypageClientLayout>;
}
