"use client";
import { Table } from "@/components/Table/page";
import Link from "next/link";
import styles from "./page.module.scss";
import BoardLayout from "@/components/common/boardLayout/page";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface InquiryRow {
  id: number;
  createdAt: string | Date;
  category?: string;
  title: string;
  status: "대기중" | "답변완료";
}

interface Props {
  data: any[];
  session: any;
  currentPage: number;
  total: number;
  pageSize: number;
  role?: string | null;
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

export default function InquiryClientPage({
  data,
  session,
  currentPage,
  total,
  pageSize,
  role,
}: Props) {
  const router = useRouter();
  const isUserLoggedIn = session;

  const currentUserId = session?.user?.id ? Number(session.user.id) : null;

  const maskName = (name: string) => {
    if (!name) return "탈퇴회원";
    if (name.length <= 1) return "*";
    if (name.length === 2) return name[0] + "*";
    return name[0] + "*".repeat(name.length - 2) + name.slice(-1);
  };

  const inquiryColumns = [
    {
      key: "number",
      label: "번호",
      flex: 1,
      render: (_: any, index: number) => {
        const virtualNumber = total - (currentPage - 1) * pageSize - index;
        return <span>{virtualNumber}</span>;
      },
    },
    {
      key: "date",
      label: "작성일",
      flex: 2,
      render: (row: InquiryRow) => {
        const d = new Date(row.createdAt);
        const dateString = d.toISOString().split("T")[0];
        return <span>{dateString}</span>;
      },
    },
    {
      key: "category",
      label: "카테고리",
      flex: 2,
      render: (row: InquiryRow) => {
        const category = row.category as keyof typeof categoryName;
        return <span>{categoryName[category]}</span>;
      },
    },
    {
      key: "title",
      label: "제목",
      flex: 6,
      render: (row: any) => {
        const isMine = Number(row.userId) === currentUserId;

        const isLocked = row.isPrivate && !isMine;

        return (
          <Link
            href={`/support/inquiry/${row.id}`}
            className={`${styles.titleLink} ${isLocked ? styles.locked : ""}`}
          >
            {row.isPrivate && <span className={styles.lockIcon}>🔒</span>}
            <span className={styles.text}>
              {isLocked ? "비밀글입니다." : row.title}
            </span>
          </Link>
        );
      },
    },
    {
      key: "author",
      label: "작성자",
      flex: 2,
      render: (row: any) => {
        const isMine = Number(row.userId) === currentUserId;
        return (
          <span className={isMine ? styles.myId : styles.otherId}>
            {isMine ? row.user?.name : maskName(row.user?.name)}
          </span>
        );
      },
    },
    {
      key: "status",
      label: "상태",
      flex: 2,
      render: (row: InquiryRow) => {
        const status = row.status as keyof typeof statusName;
        return <span>{statusName[status]}</span>;
      },
    },
  ];

  const handleWriteClick = () => {
    if (!isUserLoggedIn) {
      toast.error("로그인이 필요한 서비스입니다.", {
        duration: 2000,
      });

      return;
    }

    router.push("/support/inquiry/new");
  };

  return (
    <>
      <BoardLayout
        title="1:1 문의하기"
        tableTitle="1:1 문의하기 테이블"
        role={role}
        onWriteClick={handleWriteClick}
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
      >
        <Table columns={inquiryColumns} data={data} />
      </BoardLayout>
    </>
  );
}
