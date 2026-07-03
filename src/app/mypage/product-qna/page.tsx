import { prisma } from "@/lib/prisma";
import ProductQnaClientPage from "./page.client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { redirect } from "next/navigation";

export default async function ProductQnaPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const qnas = await prisma.ProductQna.findMany({
    where: {
      userId: Number(session.user.id),
    },
    include: {
      product: true,
      reply: true,
    },
  });

  return <ProductQnaClientPage qnas={qnas} />;
}
