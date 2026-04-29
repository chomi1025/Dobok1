"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./page.module.scss";
import Button from "@/components/common/buttons/page";
import Editor from "@/components/common/editor/page";
import toast from "react-hot-toast";

export default function FreeWriteClientPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isSubmitting = useRef(false);

  const mutation = useMutation({
    mutationFn: async (newPost: { title: string; content: string }) => {
      const res = await fetch("/api/community/free", {
        method: "POST",
        body: JSON.stringify(newPost),
      });
      if (!res.ok) throw new Error("등록 실패");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "FREE"] });
      toast.success("글이 등록되었습니다!");

      router.push("/community/free");
      router.refresh();
    },
    onError: (error) => {
      toast.error("등록 중 오류가 발생했습니다.");
      isSubmitting.current = false;
    },
  });

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return alert("내용을 입력해주세요.");

    if (isSubmitting.current) return;
    isSubmitting.current = true;
    mutation.mutate({ title, content });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>자유게시판 글쓰기</h1>
      </header>

      <hr />

      <div className={styles.form}>
        <input
          className={styles.titleInput}
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Editor value={content} onChange={setContent} />

        <div className={styles.actions}>
          <Button variant="outline" onClick={() => router.back()}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={mutation.isPending || isSubmitting.current}
          >
            {mutation.isPending ? "등록 중..." : "등록"}
          </Button>
        </div>
      </div>
    </div>
  );
}
