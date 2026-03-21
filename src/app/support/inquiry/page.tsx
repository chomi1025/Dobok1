import { prisma } from "@/lib/prisma";
import InquiryClientPage from "./page.client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

export default async function InquiryPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 10; //몇개씩 보이게 할건지

  const [session, inquiry, totalCount] = await Promise.all([
    getServerSession(authOptions),

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
  const role = session?.user?.role ?? null;
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <>
      <InquiryClientPage
        data={inquiry}
        session={session}
        currentPage={page}
        total={totalCount}
        pageSize={pageSize}
        role={role}
      />
    </>
  );
}
