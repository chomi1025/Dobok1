import { prisma } from "@/lib/prisma";
import BusinessUsersClientPage from "./page.client";
import { Prisma } from "@prisma/client";

export default async function BusinessUsersPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    period?: string;
    status?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
  };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 10;

  const { period, status, search, startDate, endDate } = searchParams;

  const where: Prisma.UserWhereInput = {
    businessStatus: {
      in: ["PENDING", "APPROVED", "REJECTED"],
    },

    businessInfo: {},
  };

  // 상태 필터
  if (status && status !== "ALL") {
    where.businessStatus = status as "PENDING" | "APPROVED" | "REJECTED";
  }

  // 검색 필터
  if (search?.trim()) {
    where.OR = [
      {
        businessInfo: {
          is: {
            companyName: {
              contains: search.trim(),
              mode: "insensitive",
            },
          },
        },
      },
      {
        businessInfo: {
          is: {
            businessNumber: {
              contains: search.trim(),
            },
          },
        },
      },
    ];
  }

  // 기간 필터 (사업자 신청일 기준)
  if (period) {
    const now = new Date();
    const start = new Date();

    let dateFilter = {};

    if (period === "today") {
      start.setHours(0, 0, 0, 0);

      dateFilter = {
        gte: start,
        lte: now,
      };
    } else if (period === "7days") {
      start.setDate(now.getDate() - 7);

      dateFilter = {
        gte: start,
        lte: now,
      };
    } else if (period === "30days") {
      start.setDate(now.getDate() - 30);

      dateFilter = {
        gte: start,
        lte: now,
      };
    } else if (period === "customDate" && startDate && endDate) {
      dateFilter = {
        gte: new Date(`${startDate}T00:00:00`),

        lte: new Date(`${endDate}T23:59:59`),
      };
    }

    where.businessInfo = {
      is: {
        createdAt: dateFilter,
      },
    };
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,

      select: {
        id: true,
        username: true,
        businessStatus: true,

        businessInfo: {
          select: {
            companyName: true,
            representative: true,
            businessNumber: true,
            paperUrl: true,
            createdAt: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      take: pageSize,

      skip: (currentPage - 1) * pageSize,
    }),

    prisma.user.count({
      where,
    }),
  ]);

  return (
    <BusinessUsersClientPage
      users={users}
      total={total}
      currentPage={currentPage}
      pageSize={pageSize}
    />
  );
}
