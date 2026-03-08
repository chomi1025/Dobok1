"use client";
import * as N from "./style";
import { Table } from "@/components/Table/page";
import Link from "next/link";

interface NoticeRow {
  id: number;
  date: string;
  orderNumber?: string; // 공지사항에 주문번호가 필요 없다면 나중에 수정!
  img?: string;
  name: string;
  quantity?: number;
}

interface Props {
  role?: string;
}

const noticeColumns = [
  {
    key: "number",
    label: "번호",
    flex: 0.3,
    render: (row: NoticeRow) => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{row.date}</span>

        <Link href={`/mypage/orders/${row.orderNumber}`}>
          <span style={{ textDecoration: "underline" }}>{row.orderNumber}</span>
        </Link>
      </div>
    ),
  },
  {
    key: "title",
    label: "제목",
    flex: 2,

    render: (row: NoticeRow) => (
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
    label: "날짜",
    flex: 0.6,
    render: (row: NoticeRow) => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>총 {row.quantity}개</span>
      </div>
    ),
  },
];

export default function NoticeClientPage({ role }: Props) {
  const mockNotices: NoticeRow[] = [
    {
      id: 1,
      name: "도복일번지 오픈 기념 공지사항입니다.",
      date: "2026.03.04",
      img: "https://via.placeholder.com/90",
    },
  ];

  return (
    <N.Inner>
      <h3>공지사항</h3>

      {role == "admin" && <button>글쓰기</button>}

      <Table columns={noticeColumns} inquiry={false} data={mockNotices} />
    </N.Inner>
  );
}
