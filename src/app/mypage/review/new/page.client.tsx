"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.scss";
import { useState } from "react";
import toast from "react-hot-toast";
import EditorComponent from "@/components/common/editor/page";

export default function ReviewNewClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("id");

  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [images, setImages] = useState<(File | null)[]>([null, null, null]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 상품 가짜 데이터
  const product = {
    name: "아디다스 품새도복",
    img: "/images/sample.jpg",
    option: "빨간색",
  };

  // 이미지 변경
  const handleImageChange = (index: number, file: File) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  // 이미지 삭제
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  // 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      return toast.error("별점을 선택해주세요!");
    }
    if (content.length < 5) {
      return toast.error("리뷰를 5자 이상 작성해주세요!");
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("productId", productId || "");
    formData.append("rating", rating.toString());
    formData.append("content", content);
    images.forEach((img) => {
      if (img) formData.append("images", img);
    });
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    alert("리뷰가 등록되었습니다.");
    router.push("/mypage/review");
  };

  return (
    <div className={styles.inner}>
      <header>
        <h1>상품 후기</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <div className={styles.productCard}>
          <Image src={product.img} alt={product.name} width={90} height={90} />

          <div className={styles.productInfo}>
            <span className={styles.date}>등록일:2025.10.10</span>

            <div className={styles.infoTop}>
              <div className={styles.name}>{product.name}</div>
              <div className={styles.option}>{product.option}</div>
            </div>

            <div className={styles.starWrapper}>
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className={`${styles.star} ${rating >= n ? styles.active : ""}`}
                  onClick={() => setRating(n)}
                >
                  ★
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className={styles.textWrapper}>
          <EditorComponent value={content} onChange={setContent} />
        </section>

        <div className={styles.imageWrapper}>
          {images.map((img, idx) => {
            const preview = img ? URL.createObjectURL(img) : null;
            return (
              <div className={styles.imageBox} key={idx}>
                {preview ? (
                  <>
                    <img
                      src={preview}
                      className={styles.preview}
                      alt="미리보기"
                    />
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => handleRemoveImage(idx)}
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <label className={styles.label}>
                    +
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files &&
                        handleImageChange(idx, e.target.files[0])
                      }
                    />
                  </label>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.buttonWrapper}>
          <button
            className={styles.cancel}
            type="button"
            onClick={() => router.back()}
          >
            취소하기
          </button>
          <button
            className={styles.upload}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "등록 중..." : "등록하기"}
          </button>
        </div>
      </form>
    </div>
  );
}
