import { prisma } from "@/lib/prisma";
import FaqEditClientpage from "./page.client";
import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface Params {
  params: {
    id: string;
  };
}

export default async function FaqEditpage({ params }: Params) {
  const [session, faq] = await Promise.all([
    getServerSession(authOptions),
    prisma.faq.findUnique({
      where: {
        id: Number(params.id),
      },
    }),
  ]);

  if (session?.user?.role !== "ADMIN") {
    redirect("/support/faq");
  }

  return <FaqEditClientpage faq={faq} />;
}
