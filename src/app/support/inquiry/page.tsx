import { prisma } from "@/lib/prisma";
import InquiryClientPage from "./page.client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { Inquiry } from "@prisma/client";

export const revalidate = 0;

export default async function InquiryPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id ? Number(session.user.id) : null;
  const isAdmin = session?.user?.role === "ADMIN";

  const page = Number(searchParams.page) || 1;
  const pageSize = 10; //몇개씩 보이게 할건지

  const [inquiry, totalCount] = await Promise.all([
    prisma.inquiry.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        user: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.inquiry.count(),
  ]);

  const safeInquiries = inquiry.map((item: Inquiry) => {
    const isMine = Number(item.userId) === currentUserId;
    const canRead = isAdmin || isMine;

    return {
      ...item,

      title: item.isPrivate && !canRead ? "비밀글입니다." : item.title,
      content: canRead ? item.content : null,
    };
  });

  return (
    <>
      <InquiryClientPage
        data={safeInquiries}
        currentPage={page}
        total={totalCount}
        pageSize={pageSize}
      />
    </>
  );
}
