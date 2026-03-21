"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import EditorLayout from "@/components/common/EditorLayout/page";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function NoticeNewClientPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim().length < 2) {
      toast.error("제목은 최소 2자 이상 작성해주세요.");
      return;
    }

    if (content.trim().length < 5) {
      toast.error("내용은 최소 5자 이상 작성해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/notice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        toast.success("공지사항 등록이 완료되었습니다.");

        router.refresh();
        router.push("/support/notice");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "등록에 실패했습니다.");
      }
    } catch (error) {
      toast.error("네트워크 에러가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EditorLayout
      pageTitle="공지사항 작성"
      onSubmit={handleSubmit}
      isSubmitting={isLoading}
    >
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

      {/* 내용 필드 */}
      <div className={styles.formGroup}>
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          placeholder="내용을 작성하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
    </EditorLayout>
  );
}
