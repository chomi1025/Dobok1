import { prisma } from "@/lib/prisma";
import InquiryClientPage from "./page.client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function InquiryPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const currentUserId = Number(session?.user?.id);
  const isAdmin = session?.user?.role === "ADMIN";

  // 문의데이터
  const inquiry = await prisma.inquiry.findUnique({
    where: { id: Number(params.id) },
    include: {
      replies: true,
    },
  });

  if (!inquiry) return notFound();
  const isAuthor = inquiry.userId === currentUserId;

  if (!isAuthor && !isAdmin) {
    return (
      <InquiryClientPage
        isLocked={true}
        currentUserId={currentUserId}
        isAdmin={isAdmin}
      />
    );
  }

  return (
    <InquiryClientPage
      inquiry={inquiry}
      currentUserId={currentUserId}
      isAdmin={isAdmin}
    />
  );
}
