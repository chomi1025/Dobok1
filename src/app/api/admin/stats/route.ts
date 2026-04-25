import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

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
        _sum: { total: true },
      }),
      prisma.order.findMany({
        where: { status: { in: ["PAYMENT_COMPLETE", "PREPARING"] } },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      todayOrderCount,
      preparingCount,
      todayNewUsers,
      unansweredInquiries,
      todaySales: todaySalesResult._sum?.total || 0,
      recentOrders: JSON.parse(JSON.stringify(recentOrders)),
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
