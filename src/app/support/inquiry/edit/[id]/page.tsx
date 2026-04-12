import { prisma } from "@/lib/prisma";
import InquiryEditClientPage from "./page.client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { notFound, redirect } from "next/navigation";

interface ParamsType {
  params: {
    id: string;
  };
}

export default async function InquiryEditPage({ params }: ParamsType) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const currentUserId = Number(session.user.id);
  const isAdmin = session.user.role === "ADMIN";

  const inquiry = await prisma.inquiry.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!inquiry) return notFound();

  const isAuthor = inquiry.userId === currentUserId;

  if (!isAuthor && !isAdmin) {
    redirect("/support/inquiry?error=unauthorized");
  }

  return <InquiryEditClientPage inquiry={inquiry} />;
}
