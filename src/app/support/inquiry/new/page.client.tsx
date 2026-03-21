"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import EditorLayout from "@/components/common/EditorLayout/page";
import toast from "react-hot-toast";
import { useState } from "react";

export default function InquiryWriteClientPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    category: "OTHER",
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validate = () => {
    const newErrors = { title: "", content: "" };
    let isValid = true;

    if (formData.title.trim().length < 5) {
      newErrors.title = "제목은 최소 5자 이상 입력해야 합니다.";
      isValid = false;
    }
    if (formData.title.length > 50) {
      newErrors.title = "제목이 너무 깁니다.";
      isValid = false;
    }
    if (formData.content.trim().length < 10) {
      newErrors.content = "내용은 최소 10자 이상 작성해주세요.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("문의가 정상적으로 등록되었습니다.");
        router.push("/support/inquiry");
        router.refresh();
      }
    } catch (error) {
      toast.error("등록 중 에러가 발생했습니다.");
    }
  };

  return (
    <EditorLayout
      pageTitle="1:1 문의하기"
      onSubmit={onSubmit}
      isSubmitting={isLoading}
    >
      <div className={styles.formGroup}>
        <label htmlFor="category">문의 유형</label>
        <select
          id="category"
          value={formData.category}
          onChange={handleChange}
          className={styles.selectField}
        >
          <option value="PRODUCT">상품문의</option>
          <option value="DELIVERY">배송문의</option>
          <option value="ORDER">주문/결제</option>
          <option value="RETURN">반품/환불</option>
          <option value="OTHER">기타문의</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="제목을 입력해주세요"
          className={errors.title ? styles.errorInput : ""}
        />
        {errors.title && <p className={styles.errorMessage}>{errors.title}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">문의 내용</label>
        <textarea
          id="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="문의하실 내용을 상세히 적어주세요."
          className={errors.content ? styles.errorInput : ""}
          rows={10}
        />
        {errors.content && (
          <p className={styles.errorMessage}>{errors.content}</p>
        )}
      </div>
    </EditorLayout>
  );
}
