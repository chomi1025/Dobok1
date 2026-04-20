"use client";
import styles from "./page.module.scss";
import DetailLayout from "@/components/common/DetailLayout/page";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { customConfirm } from "@/lib/swal";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
  noticeId: number;
}

export default function NoticeDetailClientPage({ noticeId }: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const queryClient = useQueryClient();
  const { data: notice } = useQuery({
    queryKey: ["notice", noticeId],
    queryFn: async () => {
      const res = await fetch(`/api/notice/${noticeId}`);
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/notice/${noticeId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("삭제 실패");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      toast.success("공지사항이 삭제되었습니다.");
      router.push("/support/notice");
    },
    onError: () => {
      toast.error("오류가 발생했습니다.");
    },
  });

  const handleDeleteNotice = async () => {
    const result = await customConfirm({
      title: "이 공지사항을 삭제하시겠습니까?",
      confirmText: "삭제",
      isDanger: true,
    });

    if (result.isConfirmed) {
      deleteMutation.mutate();
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
      <div
        className={styles.textContent}
        dangerouslySetInnerHTML={{ __html: notice.content }}
      />
    </DetailLayout>
  );
}
