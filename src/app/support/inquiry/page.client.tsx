"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { InquiryResponse, InquiryWithUser } from "@/types/types";
import { UnifiedTable } from "@/components/common/DataTable";
import { useMemo } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Button from "@/components/common/buttons/page";

interface Props {
  currentPage: number;
  pageSize: number;
}

const categoryName = {
  PRODUCT: "상품문의",
  DELIVERY: "배송문의",
  ORDER: "주문문의",
  RETURN: "취소/반품문의",
  OTHER: "기타문의",
};

const statusName = {
  WAITING: "답변대기중",
  COMPLETED: "답변완료",
};

const columnHelper = createColumnHelper<InquiryWithUser>();

export default function InquiryClientPage({ currentPage, pageSize }: Props) {
  const { data: session, status } = useSession();
  const isAdmin = status !== "loading" && session?.user?.role === "ADMIN";
  const { data } = useQuery<InquiryResponse>({
    queryKey: ["inquiries", currentPage],
    queryFn: async () => {
      const result = await fetch(`/api/support/inquiry?page=${currentPage}`);
      if (!result.ok) throw new Error("데이터를 불러오지 못했습니다.");
      return result.json();
    },
  });

  const router = useRouter();
  const currentUserId = session?.user?.id ? Number(session.user.id) : null;

  const maskName = (name: string) => {
    if (!name) return "탈퇴회원";
    if (name.length <= 1) return "*";
    if (name.length === 2) return name[0] + "*";
    return name[0] + "*".repeat(name.length - 2) + name.slice(-1);
  };

  console.log(data);
  const inquiryData = useMemo(() => data?.inquiries || [], [data]);
  const total = data?.totalCount || 0;

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "number",
        header: "번호",
        size: 60,
        cell: (info) => total - (currentPage - 1) * pageSize - info.row.index,
      }),
      columnHelper.accessor("createdAt", {
        header: "작성일",
        size: 120,
        cell: (info) => new Date(info.getValue()).toISOString().split("T")[0],
      }),
      columnHelper.accessor("category", {
        header: "카테고리",
        size: 120,
        cell: (info) =>
          categoryName[info.getValue() as keyof typeof categoryName],
      }),
      columnHelper.accessor("title", {
        header: "제목",
        size: 388,
        cell: (info) => {
          const row = info.row.original;
          const isLocked = row.isPrivate && row.title === "비밀글입니다.";
          return (
            <Link
              href={`/support/inquiry/${row.id}`}
              className={`${styles.titleLink} ${isLocked ? styles.locked : ""}`}
              prefetch={false}
            >
              {row.isPrivate && <span className={styles.lockIcon}>🔒</span>}
              <span className={styles.text}>
                {isLocked ? "비밀글입니다." : row.title}
              </span>
            </Link>
          );
        },
      }),
      columnHelper.accessor("user.name", {
        header: "작성자",
        size: 120,
        cell: (info) => {
          const row = info.row.original;
          const isMine = Number(row.userId) === currentUserId;
          const name = info.getValue() || "";
          return (
            <span className={isMine ? styles.myId : styles.otherId}>
              {isMine ? name : maskName(name)}
            </span>
          );
        },
      }),
      columnHelper.accessor("status", {
        header: "상태",
        size: 100,
        cell: (info) => statusName[info.getValue() as keyof typeof statusName],
      }),
    ],
    [total, currentPage, pageSize, currentUserId],
  );
  const table = useReactTable({
    data: inquiryData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleWriteClick = () => {
    if (!session) {
      toast.error("로그인이 필요한 서비스입니다.", { duration: 2000 });
      return;
    }
    router.push("/support/inquiry/new");
  };

  return (
    <>
      <header className={styles.titleWrapper}>
        <h1>1:1 문의하기</h1>

        <Button onClick={handleWriteClick} variant="primary">
          작성하기
        </Button>
      </header>

      <UnifiedTable
        table={table}
        className={styles.noticeTable}
        getRowProps={(row) => ({
          className: row.original.isFixed ? styles.fixedRow : "",
        })}
      />
    </>
  );
}
