"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./page.module.scss";
import Button from "@/components/common/buttons/page";

export default function MessageSendClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const receiverId = searchParams.get("to");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return toast.error("내용을 입력해주세요.");

    try {
      setIsLoading(true);
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverId: Number(receiverId),
          content,
        }),
      });

      if (res.ok) {
        toast.success("쪽지를 보냈습니다!");
        router.back();
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("쪽지 전송에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>✉️ 쪽지 보내기</h2>
      <form onSubmit={handleSend}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="상대방에게 보낼 내용을 입력하세요."
          maxLength={500}
        />
        <div className={styles.btnGroup}>
          <Button type="button" variant="edit" onClick={() => router.back()}>
            취소
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "전송 중..." : "보내기"}
          </Button>
        </div>
      </form>
    </div>
  );
}
