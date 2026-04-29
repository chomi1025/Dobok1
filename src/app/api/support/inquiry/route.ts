import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { Prisma } from "@prisma/client";

const inquiryWithUser = Prisma.validator<Prisma.InquiryDefaultArgs>()({
  include: { user: { select: { id: true, name: true } } },
});

type InquiryWithUser = Prisma.InquiryGetPayload<typeof inquiryWithUser>;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === "ADMIN";
    const currentUserId = session?.user?.id ? Number(session.user.id) : null;

    const [inquiries, totalCount] = await Promise.all([
      prisma.inquiry.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      prisma.inquiry.count(),
    ]);

    const processedInquiries = inquiries.map((inquiry: InquiryWithUser) => {
      const isMine = inquiry.userId === currentUserId;

      if (inquiry.isPrivate && !isMine && !isAdmin) {
        return {
          ...inquiry,
          title: "비밀글입니다.",
          content: "비밀글입니다.",
        };
      }
      return inquiry;
    });

    return NextResponse.json({
      inquiries: processedInquiries,
      totalCount,
    });
  } catch (error) {
    console.error("Inquiry GET Error:", error);
    return NextResponse.json(
      { error: "데이터를 불러오는 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
