"use client";
import dynamic from "next/dynamic";
import styles from "./page.module.scss";
import {
  ShoppingBag,
  Users,
  CreditCard,
  Package,
  MessageSquare,
} from "lucide-react";
import { Order } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const SalesChart = dynamic(() => import("../component/SalesChart"), {
  ssr: false,
  loading: () => (
    <div
      style={{ height: 300, backgroundColor: "#f3f4f6", borderRadius: "12px" }}
    />
  ),
});

interface AdminDashboardData {
  todayOrderCount: number;
  preparingCount: number;
  todayNewUsers: number;
  unansweredInquiries: number;
  todaySales: number;
  recentOrders: Order[];
}

const STATUS_MAP: Record<string, string> = {
  PENDING: "결제대기",
  PAYMENT_COMPLETE: "결제완료",
  PREPARING: "상품준비중",
  SHIPPING: "배송중",
  DELIVERED: "배송완료",
  CANCELLED: "취소됨",
};

export default function AdminDashboard() {
  const { data } = useQuery<AdminDashboardData>({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      return {} as AdminDashboardData;
    },
    staleTime: 60000,
  });
  if (!data) return null;

  const {
    todayOrderCount,
    preparingCount,
    todayNewUsers,
    unansweredInquiries,
    todaySales,
    recentOrders,
  } = data;

  const stats = [
    {
      id: 1,
      label: "오늘의 주문 (누적)",
      value: `${todayOrderCount}건`,
      icon: <ShoppingBag />,
      color: "#4f46e5",
    },
    {
      id: 2,
      label: "상품 준비 중 (미발송)",
      value: `${preparingCount}건`,
      icon: <Package />,
      color: "#ec4899",
    },
    {
      id: 3,
      label: "오늘의 결제 금액",
      value: `${Number(todaySales).toLocaleString()}원`,
      icon: <CreditCard />,
      color: "#f59e0b",
    },
    {
      id: 4,
      label: "신규 회원 (오늘)",
      value: `${todayNewUsers}건`,
      icon: <Users />,
      color: "#10b981",
    },
    {
      id: 5,
      label: "미답변 문의",
      value: `${unansweredInquiries}건`,
      icon: <MessageSquare />,
      color: "#ef4444",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>대시보드</h1>

      <section className={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.id} className={styles.statCard}>
            <div
              className={styles.iconWrapper}
              style={{ backgroundColor: stat.color }}
            >
              {stat.icon}
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>{stat.label}</p>
              <h3 className={styles.statValue}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.chartSection}>
        <div className={styles.sectionHeader}>
          <h2>매출 현황 (최근 7일)</h2>
        </div>
        <div className={styles.chartWrapper}>
          <SalesChart />
        </div>
      </section>

      <div className={styles.contentGrid}>
        <section className={styles.recentOrders}>
          <div className={styles.sectionHeader}>
            <h2>처리 필요한 주문 (최신 5건)</h2>
            <button className={styles.moreBtn}>전체 보기</button>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>주문번호</th>
                <th>주문자</th>
                <th>금액</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order: Order) => {
                return (
                  <tr key={order.orderNumber}>
                    <td>{order.orderNumber}</td>
                    <td>{order.buyerName}</td>
                    <td>{order.total.toLocaleString()}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles.paid}`}>
                        {STATUS_MAP[order.status]}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
