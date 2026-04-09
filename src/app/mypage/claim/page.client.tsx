"use client";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { Column, Table } from "@/components/Table/page";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import PeriodTabsComponent from "@/components/mypage/PeriodTabs";
import PagenationComponent from "@/components/pagenation/page";
import Image from "next/image";

type ClaimType = "cancel" | "exchange" | "return";

type PeriodType = "1MONTH" | "3MONTH" | "6MONTH" | "12MONTH" | "CUSTOM";

interface Claim {
  id: number;
  type: ClaimType;
  requestedAt: string;
  claimNumber: string;
  name: string;
  img: string;
  price: string;
  quantity: number;
  total: string;
}

interface Props {
  claims: Claim[];
}

const CLAIM_TYPE_LABEL = {
  cancel: "취소",
  exchange: "교환",
  return: "반품",
} as const;

export default function ClaimsClientPage({ claims: initialClaims }: Props) {
  const [period, setPeriod] = useState<PeriodType>("1MONTH");
  const [customRange, setCustomRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [displayClaims, setDisplayClaims] = useState<Claim[]>(
    initialClaims || [],
  );
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const pageCount = Math.ceil(displayClaims.length / itemsPerPage);
  const currentItems = displayClaims.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  useEffect(() => {
    const fetchClaims = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/mypage/claim", {
          credentials: "include",
        });
        if (res.ok) {
          const data: Claim[] = await res.json();
          setDisplayClaims(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  }, []);

  const mockClaims: Claim[] = [
    {
      id: 1,
      type: "cancel",
      requestedAt: "2026-04-05",
      claimNumber: "C-20260405-123",
      name: "프리미엄 선수용 도복 - 화이트",
      img: "https://via.placeholder.com/90",
      price: "125000",
      quantity: 1,
      total: "125000",
    },
    {
      id: 2,
      type: "exchange",
      requestedAt: "2026-04-03",
      claimNumber: "E-20260403-045",
      name: "컴팩트 훈련용 도복 - 블루",
      img: "https://via.placeholder.com/90",
      price: "89000",
      quantity: 1,
      total: "89000",
    },
    {
      id: 3,
      type: "return",
      requestedAt: "2026-03-28",
      claimNumber: "R-20260328-999",
      name: "경량 스파링 보호구 세트",
      img: "https://via.placeholder.com/90",
      price: "45000",
      quantity: 2,
      total: "90000",
    },
    {
      id: 4,
      type: "cancel",
      requestedAt: "2026-03-20",
      claimNumber: "C-20260320-012",
      name: "도복 전용 가방 - 라지",
      img: "https://via.placeholder.com/90",
      price: "35000",
      quantity: 1,
      total: "35000",
    },
    {
      id: 5,
      type: "exchange",
      requestedAt: "2026-03-15",
      claimNumber: "E-20260315-777",
      name: "입문자용 도복 - 네이비",
      img: "https://via.placeholder.com/90",
      price: "65000",
      quantity: 1,
      total: "65000",
    },
  ];

  const claimColumns: Column<Claim>[] = [
    {
      key: "type",
      label: <span style={{ flex: 1, textAlign: "center" }}>유형</span>,
      flex: 0.8,
      render: (row) => <span>{CLAIM_TYPE_LABEL[row.type]}</span>,
    },
    {
      key: "claim_info",
      label: "신청정보",
      flex: 1.8,
      render: (row) => (
        <div className={styles.claimInfo}>
          <span>{row.requestedAt}</span>

          <Link href={`/mypage/claim/${row.claimNumber}`}>
            {row.claimNumber}
          </Link>
        </div>
      ),
    },
    {
      key: "name",
      label: <span style={{ flex: 1, textAlign: "center" }}>상품명/옵션</span>,
      flex: 4,
      align: "left",
      render: (row) => (
        <div className={styles.nameOption}>
          <Image src={row.img} width={90} height={90} alt={row.name} />

          <span>{row.name}</span>
        </div>
      ),
    },
    {
      key: "price",
      label: "상품금액/수량",
      flex: 1.2,
      render: (row) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span>{Number(row.price).toLocaleString()}원</span>
          <span style={{ fontSize: "13px", color: "#888" }}>
            {row.quantity}개
          </span>
        </div>
      ),
    },
    {
      key: "total",
      label: "합계금액",
      flex: 1.2,
      render: (row) => <span>{Number(row.total).toLocaleString()}원</span>,
    },
  ];

  return (
    <div className={styles.inner}>
      <header>
        <h1>취소/교환/반품 조회</h1>

        {/* 날짜 선택 탭 */}
        <PeriodTabsComponent
          period={period}
          onPeriodChange={(p) => {
            setPeriod(p);
            setCustomRange(null);
          }}
          onCustomSubmit={(start, end) => {
            setPeriod("CUSTOM");
            setCustomRange({ start, end });
          }}
        />
      </header>

      {/* 테이블 목록 */}
      <Table columns={claimColumns} data={mockClaims} />

      {/* 페이지네이션 */}
      <PagenationComponent
        total={displayClaims.length}
        pageSize={itemsPerPage}
        currentPage={currentPage + 1}
      />
    </div>
  );
}
