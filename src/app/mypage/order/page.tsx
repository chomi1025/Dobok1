"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as M from "../style";
import * as O from "../style";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";
import { Column, Table } from "@/components/Table/page";
import OrderSkeleton from "./OrderSkeleton";
import PeriodTabsComponent from "@/components/mypage/PeriodTabs";
import { useRouter } from "next/navigation";

export type OrderStatus =
  | "PAYMENT_COMPLETE" // 결제완료
  | "PREPARING" // 상품준비중
  | "SHIPPING" // 배송중
  | "DELIVERED"; // 배송완료

type PeriodType = "1MONTH" | "3MONTH" | "6MONTH" | "12MONTH" | "CUSTOM";

type FixedPeriod = Exclude<PeriodType, "CUSTOM">;

const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  PAYMENT_COMPLETE: "결제완료",
  PREPARING: "상품준비중",
  SHIPPING: "배송중",
  DELIVERED: "배송완료",
};

export interface Order {
  id: number;
  date: string;
  orderNumber: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  status: OrderStatus;
  claims?: {
    id: number;
    claimType: "RETURN" | "EXCHANGE";
    status: string;
  }[];
  reviewWritten?: boolean;
}

const orderColumns: Column<Order>[] = [
  {
    key: "date",
    label: "날짜/주문번호",
    flex: 1.4,
    render: (row) => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{row.date}</span>

        <Link href={`/mypage/orders/${row.orderNumber}`}>
          <span style={{ textDecoration: "underline" }}>{row.orderNumber}</span>
        </Link>
      </div>
    ),
  },
  {
    key: "name",
    label: "상품명/옵션",
    flex: 3,
    align: "left",
    render: (row) => (
      <div style={{ display: "flex", alignItems: "center", gap: "23px" }}>
        <Link href={`/mypage/order/${row.orderNumber}`}>
          <img src={row.img} width={90} height={90} />
        </Link>

        <Link href={`/mypage/order/${row.orderNumber}`}>
          <span>{row.name}</span>
        </Link>
      </div>
    ),
  },
  {
    key: "price",
    label: "수량",
    flex: 1,
    render: (row) => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>총 {row.quantity}개</span>
      </div>
    ),
  },
  {
    key: "total",
    label: "합계금액",
    flex: 1,
    render: (row) => <strong>{row.total.toLocaleString()}원</strong>,
  },
  {
    key: "status",
    label: "상태 / 처리",
    flex: 1.2,
    render: (row) => {
      const router = useRouter();
      const claim = (row as any).claims?.[0];

      return (
        <O.StatusActions>
          <span>{ORDER_STATUS_LABEL[row.status]}</span>

          {row.status === "PAYMENT_COMPLETE" && (
            <O.SecondaryButton>주문취소</O.SecondaryButton>
          )}

          {row.status === "SHIPPING" && (
            <O.SecondaryButton>배송조회</O.SecondaryButton>
          )}

          {row.status === "DELIVERED" && (
            <>
              {/* 리뷰 버튼 */}
              {!row.reviewWritten && !claim && (
                <O.PrimaryButton
                  onClick={() =>
                    router.push(
                      `/mypage/review/select?orderNumber=${row.orderNumber}`,
                    )
                  }
                >
                  리뷰작성
                </O.PrimaryButton>
              )}

              {/* 반품/교환 버튼 */}
              {claim ? (
                <O.SecondaryButton
                  onClick={() =>
                    router.push(`/mypage/claim/${claim.claimNumber}`)
                  }
                >
                  {claim.claimType === "RETURN" ? "반품 신청됨" : "교환 신청됨"}{" "}
                  - {claim.status === "REQUESTED" ? "처리중" : "완료"}
                </O.SecondaryButton>
              ) : (
                <O.SecondaryButton
                  onClick={() =>
                    router.push(`/mypage/claim/new?orderId=${row.id}`)
                  }
                >
                  반품/교환 신청
                </O.SecondaryButton>
              )}
            </>
          )}
        </O.StatusActions>
      );
    },
  },
];

export default function OrdersPage() {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // 날짜관련
  const [period, setPeriod] = useState<PeriodType>("1MONTH"); //기본탭 : 1개월
  const [customRange, setCustomRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null); //커스텀 탭

  // 서버에서 주문 데이터를 fetch하는 함수
  async function fetchOrders() {
    const res = await fetch("/api/mypage/orders", {
      credentials: "include", // 이거 필수!
    });
    return res.json();
  }
  // 서버 데이터 fetch
  const [loading, setLoading] = useState(true);

  const periodToMonths: Record<FixedPeriod, number> = {
    "1MONTH": 1,
    "3MONTH": 3,
    "6MONTH": 6,
    "12MONTH": 12,
  };

  //날짜 함수
  const filterByPeriod = (orders: Order[] | undefined, period: FixedPeriod) => {
    if (!Array.isArray(orders)) return [];

    const now = new Date();
    const months = periodToMonths[period];
    const fromDate = new Date(now.getFullYear(), now.getMonth() - months, 1);

    return orders.filter((o) => new Date(o.date) >= fromDate);
  };

  const filterOrders = (orders: Order[], period: PeriodType) => {
    if (period === "CUSTOM") {
      if (!customRange) return orders;

      return orders.filter((o) => {
        const date = new Date(o.date);
        return date >= customRange.start && date <= customRange.end;
      });
    }

    // 🔥 여기서 새로운 변수에 담아줘야 함
    const fixedPeriod: FixedPeriod = period;

    return filterByPeriod(orders, fixedPeriod);
  };

  // 주문배송이력 로딩
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);

        const data: Order[] = await fetchOrders();

        setAllOrders(data);
        setOrders(filterByPeriod(data, "1MONTH")); // 초기 1개월
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  useEffect(() => {
    setOrders(filterOrders(allOrders, period));
    setCurrentPage(0);
  }, [period, customRange, allOrders]);

  // 페이지네이션
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const currentItems = orders.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  // 페이지 변경 핸들러
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <M.Contents>
      <h2>주문/배송 조회</h2>

      {/* 날짜 선택 탭 */}
      <PeriodTabsComponent
        period={period}
        onPeriodChange={(p) => {
          setPeriod(p);
          setCustomRange(null); // 🔥 탭 누르면 커스텀 초기화
        }}
        onCustomSubmit={(start, end) => {
          setPeriod("CUSTOM");
          setCustomRange({ start, end });
        }}
      />

      {/* 테이블 목록 */}
      <Table
        columns={orderColumns}
        inquiry={false}
        data={loading ? [] : currentItems}
      />

      {loading && <OrderSkeleton />}

      {/* 페이지네이션 */}
      <O.Pagination>
        <ReactPaginate
          pageCount={pageCount > 0 ? pageCount : 1} // 페이지 없으면 1로
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName={`page-item prev ${currentPage === 0 ? "disabled" : ""}`}
          previousLinkClassName="page-link"
          nextClassName={`page-item next ${currentPage + 1 === pageCount ? "disabled" : ""}`}
          nextLinkClassName="page-link"
          activeClassName="active"
          previousLabel={<img src="/image/active-left.png" alt="이전" />}
          nextLabel={<img src="/image/active-right.png" alt="다음" />}
        />
      </O.Pagination>
    </M.Contents>
  );
}
