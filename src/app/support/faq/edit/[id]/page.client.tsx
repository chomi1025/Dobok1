"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import EditorLayout from "@/components/common/EditorLayout/page";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  faq: {
    id: number;
    category: string;
    question: string;
    answer: string;
    sortOrder: number;
  };
}
export default function FaqNewClientPage({ faq }: Props) {
  const [category, setCategory] = useState(faq.category);
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!category) {
      toast.error("카테고리를 선택해주세요.");
      return;
    }

    if (question.trim().length < 2) {
      toast.error("제목은 최소 2자 이상 작성해주세요.");
      return;
    }

    if (answer.trim().length < 5) {
      toast.error("내용은 최소 5자 이상 작성해주세요.");
      return;
    }

    setIsPending(true);

    try {
      const response = await fetch(`/api/faq/${faq.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, question, answer }),
      });

      if (response.ok) {
        toast.success("FAQ 수정이 완료되었습니다.");
        router.push("/support/faq");
        router.refresh();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "수정에 실패했습니다.");
      }
    } catch (error) {
      toast.error("네트워크 에러가 발생했습니다.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <EditorLayout
        pageTitle="FAQ 수정"
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      >
        <div className={styles.formGroup}>
          <label htmlFor="category">카테고리</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className={styles.selectField}
          >
            <option value="" disabled>
              분류를 선택해주세요
            </option>
            <option value="delivery">배송</option>
            <option value="payment">결제</option>
            <option value="product">상품</option>
            <option value="return">교환/반품</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            placeholder="제목을 입력하세요"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        {/* 내용 필드 */}
        <div className={styles.formGroup}>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            placeholder="내용을 작성하세요"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>
      </EditorLayout>
    </>
  );
}
