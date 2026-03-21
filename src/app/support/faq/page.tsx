import { prisma } from "@/lib/prisma";
import FaqClientPage from "./page.client";
import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const [session, faqs] = await Promise.all([
    getServerSession(authOptions),
    prisma.Faq.findMany(),
  ]);
  const isAdmin = session?.user?.role === "ADMIN";

  return <FaqClientPage faqs={faqs} isAdmin={isAdmin} />;
}
