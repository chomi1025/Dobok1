"use client";
import styles from "./page.module.scss";
import DetailLayout from "@/components/common/DetailLayout/page";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { customConfirm } from "@/lib/swal";

interface Props {
  isAdmin: boolean;
  notice: {
    id: number;
    title: string;
    createdAt: Date;
    content: string;
  };
}

export default function NoticeDetailClientPage({ isAdmin, notice }: Props) {
  const router = useRouter();

  const handleDeleteNotice = async () => {
    const result = await customConfirm("삭제하시겠습니까?");

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/notice/${notice.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          router.refresh();
          router.push("/support/notice");
          toast.success("답변이 삭제되었습니다.");
        } else {
          toast.error("오류가 발생했습니다.");
        }
      } catch (error) {
        toast.error("네트워크 에러");
      }
    }
  };

  return (
    <DetailLayout
      pageTitle="공지사항"
      title={notice.title}
      date={new Date(notice.createdAt).toLocaleDateString()}
      backLink="/support/notice"
      editLink={`/support/notice/edit/${notice.id}`}
      isAdmin={isAdmin}
      isAuthor={isAdmin}
      onDelete={handleDeleteNotice}
    >
      <div className={styles.textContent}>{notice.content}</div>
    </DetailLayout>
  );
}
