import { prisma } from "@/lib/prisma";
import { OrderStatus, Prisma } from "@prisma/client";
import dynamic from "next/dynamic";

export const metadata = {
  title: "관리자 페이지 - 주문관리",
  description: "관리자페이지-주문관리입니다.",
};

const OrdersClientPage = dynamic(() => import("./page.client"), {
  ssr: false,
});

export default async function OrdersPage({
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
  let where: Prisma.OrderWhereInput = {};

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
    where.status = status as OrderStatus;
  }

  if (search) {
    where.OR = [
      { orderNumber: { contains: search, mode: "insensitive" } },
      { buyerName: { contains: search, mode: "insensitive" } },
      {
        items: {
          some: { productName: { contains: search, mode: "insensitive" } },
        },
      },
    ];
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      include: { items: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.count({ where }),
  ]);

  return (
    <OrdersClientPage
      orders={orders}
      total={total}
      pageSize={pageSize}
      currentPage={currentPage}
    />
  );
}
