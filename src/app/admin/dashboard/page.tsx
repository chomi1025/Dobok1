import { prisma } from "@/lib/prisma";
import DashboardClientPage from "./page.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const metadata = {
  title: "도복일번지 | 관리자 페이지 - 대시보드",
  description: "관리자페이지 대시보드입니다.",
};

export const revalidate = 60;

export default async function DashboardPage() {
  const queryClient = new QueryClient();
  const todayStart = new Date(new Date().setHours(0, 0, 0, 0));

  await queryClient.prefetchQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const [
        todayOrderCount,
        preparingCount,
        todayNewUsers,
        unansweredInquiries,
        todaySalesResult,
        recentOrders,
      ] = await Promise.all([
        prisma.order.count({
          where: {
            createdAt: { gte: todayStart },
            status: { not: "CANCELLED" },
          },
        }),
        prisma.order.count({ where: { status: "PREPARING" } }),
        prisma.user.count({ where: { createdAt: { gte: todayStart } } }),
        prisma.inquiry.count({ where: { status: "WAITING" } }),
        prisma.order.aggregate({
          where: {
            createdAt: { gte: todayStart },
            status: {
              in: ["PAYMENT_COMPLETE", "PREPARING", "SHIPPING", "DELIVERED"],
            },
          },
          _sum: {
            total: true,
          },
        }),
        prisma.order.findMany({
          where: { status: { in: ["PAYMENT_COMPLETE", "PREPARING"] } },
          orderBy: { createdAt: "desc" },
          take: 5,
        }),
      ]);

      return {
        todayOrderCount,
        preparingCount,
        todayNewUsers,
        unansweredInquiries,
        todaySales: todaySalesResult._sum?.total || 0,
        recentOrders: JSON.parse(JSON.stringify(recentOrders)),
      };
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClientPage />
    </HydrationBoundary>
  );
}
