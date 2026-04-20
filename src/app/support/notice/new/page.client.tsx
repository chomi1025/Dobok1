"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import EditorLayout from "@/components/common/EditorLayout/page";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EditorComponent from "@/components/common/editor/page";

export default function NoticeNewClientPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isFixed, setIsFixed] = useState(false);

  const router = useRouter();

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (newData: {
      title: string;
      content: string;
      isFixed: boolean;
    }) => {
      const response = await fetch("/api/notice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "등록에 실패했습니다.");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });

      toast.success("공지사항 등록이 완료되었습니다.");
      router.push("/support/notice");
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

    if (content.trim().length < 5) {
      toast.error("내용은 최소 5자 이상 작성해주세요.");
      return;
    }

    createMutation.mutate({ title, content, isFixed });
  };

  return (
    <EditorLayout
      pageTitle="공지사항 작성"
      onSubmit={handleSubmit}
      isSubmitting={createMutation.isPending}
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
