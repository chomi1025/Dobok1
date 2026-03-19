"use client";
import styles from "./page.module.scss";
import { Table } from "@/components/Table/page";
import Link from "next/link";

interface NoticeRow {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface Props {
  role?: "ADMIN" | "USER" | string | null;
  notice: [];
}

const noticeColumns = [
  {
    key: "number",
    label: "번호",
    flex: 0.3,
    render: (row: NoticeRow) => <span>{row.id}</span>,
  },
  {
    key: "title",
    label: "제목",
    flex: 2,

    render: (row: NoticeRow) => (
      <Link href={`/notice/${row.id}`}>
        <span>{row.title}</span>
      </Link>
    ),
  },
  {
    key: "price",
    label: "날짜",
    flex: 0.6,
    render: (row: NoticeRow) => (
      <span>{new Date(row.createdAt).toLocaleDateString()}</span>
    ),
  },
];

export default function NoticeClientPage({ role, notice }: Props) {
  return (
    <>
      <section className={styles.titleWrapper}>
        <h1>공지사항</h1>
      </section>

      <article className={styles.mainContents}>
        <div>
          {role == "ADMIN" && (
            <button className={styles.adminActions}>작성하기</button>
          )}
        </div>

        <h2>공지사항 테이블</h2>
        <Table columns={noticeColumns} inquiry={false} data={notice} />
      </article>
    </>
  );
}
