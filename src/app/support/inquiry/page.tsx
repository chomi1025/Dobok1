"use client";
import * as I from "./style";
import { Table } from "@/components/Table/page";
import Link from "next/link";

interface InquiryRow {
  id: number;

  date: string;
  orderNumber: string;
  img: string;
  name: string;
  quantity: number;
}

const inquiryColumns = [
  {
    key: "number",
    label: "번호",
    flex: 1,
    render: (row: InquiryRow) => (
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
    flex: 6,

    render: (row: InquiryRow) => (
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
    label: "작성일",
    flex: 2,
    render: (row: InquiryRow) => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>총 {row.quantity}개</span>
      </div>
    ),
  },
  {
    key: "status",
    label: "상태",
    flex: 1.5,
    render: (row: InquiryRow) => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>총 {row.quantity}개</span>
      </div>
    ),
  },
];

export default function InquiryPage() {
  const mockData: InquiryRow[] = [
    {
      id: 123,
      date: "2026.03.04",
      orderNumber: "ORD-12345",
      img: "https://via.placeholder.com/90",
      name: "프리미엄 유도복",
      quantity: 1,
    },
  ];

  return (
    <>
      <I.Inner>
        <h3>1:1 문의하기</h3>

        <Table columns={inquiryColumns} data={mockData} />
      </I.Inner>
    </>
  );
}
