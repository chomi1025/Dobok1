"use client";

import styles from "./AdminAnswer.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { EstimatePost } from "./EstimateTable";
import { customConfirm } from "@/lib/swal";

type Mode = "create" | "view" | "edit";

export default function AdminAnswer({
  id,
  initialAnswer = "",
  estimate,
  answeredAt,
}: {
  id: string;
  initialAnswer?: string;
  estimate: EstimatePost;
  answeredAt?: Date;
}) {
  const router = useRouter();

  const [answer, setAnswer] = useState(initialAnswer);
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState<Mode>(initialAnswer ? "view" : "create");

  const date = new Date(estimate.answeredAt);

  const formatted = `${date.getFullYear()}-${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours(),
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

  const onSubmit = async () => {
    if (!answer.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/estimate/${id}/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer }),
      });

      if (!res.ok) throw new Error();

      toast.success("답변 등록 완료!");
      setMode("view");
      router.refresh();
    } catch {
      toast.error("에러 발생");
    } finally {
      setLoading(false);
    }
  };

  // 수정
  const onUpdate = async () => {
    if (!answer.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/estimate/${id}/answer`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer }),
      });

      if (!res.ok) throw new Error();

      toast.success("수정 완료!");
      setMode("view");
      router.refresh();
    } catch {
      toast.error("수정 실패");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    const result = await customConfirm({
      title: "답변을 삭제할까요?",
      text: "삭제하면 다시 복구할 수 없습니다.",
      confirmText: "삭제",
      cancelText: "취소",
      isDanger: true,
    });

    if (!result.isConfirmed) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/estimate/${id}/answer`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      toast.success("삭제 완료!");
      setAnswer("");
      setMode("create");
      router.refresh();
    } catch {
      toast.error("삭제 실패");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className={styles.adminAnswerSection}>
      <h2>관리자 답변</h2>

      {mode === "create" || mode === "edit" ? (
        <>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className={styles.textarea}
            placeholder="답변 입력"
          />

          <button
            onClick={mode === "create" ? onSubmit : onUpdate}
            disabled={loading}
            className={styles.submitButton}
          >
            {loading
              ? "처리중..."
              : mode === "create"
                ? "답변 등록"
                : "수정 완료"}
          </button>

          {/* 취소 */}
          {mode === "edit" && (
            <button
              onClick={() => {
                setAnswer(initialAnswer);
                setMode("view");
              }}
              className={styles.cancelButton}
            >
              취소
            </button>
          )}
        </>
      ) : (
        <>
          <div className={styles.answerView}>
            {answer ? answer : "아직 답변이 없습니다."}
          </div>

          <div className={styles.meta}>
            {answeredAt && (
              <span className={styles.answerTime}>{formatted}</span>
            )}
          </div>

          <button onClick={() => setMode("edit")} className={styles.editButton}>
            수정
          </button>

          <button
            onClick={onDelete}
            disabled={loading}
            className={styles.deleteButton}
          >
            삭제
          </button>
        </>
      )}
    </section>
  );
}
