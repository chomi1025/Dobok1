"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import EditorLayout from "@/components/common/EditorLayout/page";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import EditorComponent from "@/components/common/editor/page";

interface Props {
  noticeId: number;
}

export default function NoticeEditClientPage({ noticeId }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: notice } = useQuery({
    queryKey: ["notice", noticeId],
    queryFn: async () => {
      const response = await fetch(`/api/notice/${noticeId}`);
      if (!response.ok) throw new Error("데이터 로드 실패");
      return response.json();
    },
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isFixed, setIsFixed] = useState<boolean>(false);

  useEffect(() => {
    if (notice) {
      setTitle(notice.title);
      setContent(notice.content);
      setIsFixed(notice.isFixed || false);
    }
  }, [notice]);

  const updateMutation = useMutation({
    mutationFn: async (updatedData: {
      title: string;
      content: string;
      isFixed: boolean;
    }) => {
      const response = await fetch(`/api/notice/${noticeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "수정에 실패했습니다.");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notice", noticeId] });
      queryClient.invalidateQueries({ queryKey: ["notices"] });

      toast.success("공지사항 수정이 완료되었습니다.");
      router.push(`/support/notice/${noticeId}`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim().length < 2) {
      toast.error("제목은 최소 2자 이상 작성해주세요.");
      return;
    }

    if (content.replace(/<[^>]*>?/gm, "").trim().length < 5) {
      toast.error("내용은 최소 5자 이상 작성해주세요.");
      return;
    }

    updateMutation.mutate({ title, content, isFixed });
  };

  return (
    <EditorLayout
      pageTitle="공지사항 수정"
      onSubmit={handleSubmit}
      isSubmitting={updateMutation.isPending}
    >
      <div className={styles.checkboxGroup}>
        <input
          id="isFixed"
          type="checkbox"
          checked={isFixed}
          onChange={(e) => setIsFixed(e.target.checked)}
        />
        <label htmlFor="isFixed">이 글을 상단에 고정합니다 (필독 공지)</label>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">내용</label>

        <EditorComponent value={content} onChange={setContent} />
      </div>
    </EditorLayout>
  );
}
