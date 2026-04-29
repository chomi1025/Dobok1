import { prisma } from "@/lib/prisma";
import UserManagementClientPage from "./page.client";
import { Prisma, UserStatus } from "@prisma/client";

export default async function UserManagementPage({
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
  let where: Prisma.UserWhereInput = {};

  if (period) {
    const now = new Date();
    const start = new Date();

    if (period === "today") {
      start.setHours(0, 0, 0, 0);
      where.createdAt = { gte: start, lte: now };
    } else if (period === "7days") {
      start.setDate(now.getDate() - 7);
      where.createdAt = { gte: start, lte: now };
    } else if (period === "30days") {
      start.setDate(now.getDate() - 30);
      where.createdAt = { gte: start, lte: now };
    } else if (period === "customDate" && startDate && endDate) {
      where.createdAt = {
        gte: new Date(`${startDate}T00:00:00`),
        lte: new Date(`${endDate}T23:59:59`),
      };
    }
  }

  if (status && status !== "ALL") {
    const statusMapping: Record<string, UserStatus> = {
      ACTIVE: "ACTIVE",
      WITHDRAWN: "WITHDRAWN",
      RESTRICTED: "BANNED",
    };

    const targetStatus = statusMapping[status] || (status as UserStatus);
    where.status = targetStatus;
  }

  if (search) {
    const pureNumbers = search.replace(/[^0-9]/g, "");

    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { nickname: { contains: search, mode: "insensitive" } },
      { username: { contains: search, mode: "insensitive" } },
      { phone: { contains: search } },
    ];

    if (pureNumbers.length > 0) {
      where.OR.push({ phone: { contains: pureNumbers } });
    }
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where }),
  ]);

  return (
    <UserManagementClientPage
      users={users}
      total={total}
      pageSize={pageSize}
      currentPage={currentPage}
    />
  );
}
