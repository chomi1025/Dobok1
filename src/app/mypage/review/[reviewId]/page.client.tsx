"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./page.module.scss";
import EditorComponent from "@/components/common/editor/page";

type ReplyType = {
  id: number;
  content: string;
  createdAt: string;
};

type ReviewType = {
  id: number;
  rating: number;
  content: string;
  images: string[];
  createdAt: string;
  orderItem: {
    product: {
      name: string;
      img: string;
    };
    option?: string;
  };
  reply?: ReplyType;
};

export interface Props {
  initialReviews: ReviewType;
}
export default function ReviewDetailClientPage({ initialReviews }: Props) {
  const params = useParams();
  const reviewId = params.reviewId;

  const [review, setReview] = useState<ReviewType | null>(initialReviews);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [reviewContent, setReviewContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const loginUserRole = session?.user?.role?.toLowerCase();

  const [isEditingReply, setIsEditingReply] = useState(false);

  const handleUpdateReview = async () => {
    if (!reviewContent) return alert("내용을 입력해주세요");

    try {
      const res = await fetch(`/api/mypage/review/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: reviewContent }),
      });

      if (!res.ok) throw new Error();

      const updated = await res.json();

      setReview((prev: any) => ({
        ...prev,
        content: updated.content,
      }));

      setIsEditingReview(false);
      alert("리뷰가 수정되었습니다!");
    } catch {
      alert("리뷰 수정 실패");
    }
  };

  const handleDeleteReview = async () => {
    if (!confirm("리뷰를 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`/api/mypage/review/${reviewId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      alert("리뷰가 삭제되었습니다");
      router.push("/mypage/review");
    } catch {
      alert("리뷰 삭제 실패");
    }
  };

  const handleSubmitReply = async () => {
    if (!replyContent) return alert("답변 내용을 입력해주세요");

    try {
      const res = await fetch(`/api/mypage/review/${reviewId}/reply`, {
        method: "POST",
        body: JSON.stringify({ content: replyContent }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("답변 등록 실패");

      const updated = await res.json();

      setReview((prev: any) => ({
        ...prev,
        reply: updated,
      }));

      setReplyContent(updated.content);
      setIsEditingReply(false);

      alert("답변이 등록되었습니다!");
    } catch (err) {
      console.error(err);
      alert("답변 등록 중 오류가 발생했습니다");
    }
  };

  if (!review) {
    return <div className={styles.inner}>로딩 중입니다... </div>;
  }

  return (
    <div className={styles.inner}>
      <header>
        <h1 className={styles.title}>리뷰 상세</h1>

        <div className={styles.buttonTop}>
          <button
            onClick={() => {
              setReviewContent(review.content);
              setIsEditingReview(true);
            }}
          >
            수정
          </button>
          <button onClick={handleDeleteReview}>삭제</button>
        </div>
      </header>

      <div className={styles.productCard}>
        <Image
          src={review.orderItem.product.img}
          alt="상품"
          width={90}
          height={90}
        />
        <div className={styles.productInfo}>
          <span className={styles.date}>{review.createdAt.slice(0, 10)}</span>
          <div className={styles.infoTop}>
            <div className={styles.name}>{review.orderItem.product.name}</div>
            <div className={styles.option}>
              {review.orderItem.option || "옵션 없음"}
            </div>
          </div>
          <div className={styles.starWrapper}>
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className={`${styles.star} ${review.rating >= n ? styles.active : ""}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div
        className={`${styles.contents} ${isEditingReview ? styles.isEditing : ""}`}
      >
        {!isEditingReview ? (
          <div
            className={styles.section}
            dangerouslySetInnerHTML={{ __html: review.content }}
          />
        ) : (
          <>
            <EditorComponent
              value={reviewContent}
              onChange={setReviewContent}
            />
          </>
        )}
      </div>

      {/* 중간 버튼 (수정 모드일 때만) */}
      {isEditingReview && (
        <div className={styles.buttonMiddle}>
          <button onClick={() => setIsEditingReview(false)}>취소</button>
          <button onClick={handleUpdateReview}>등록</button>
        </div>
      )}

      {/* 답변 영역 */}
      <div className={styles.answer}>
        <h3>답변</h3>
        {loginUserRole === "ADMIN" ? (
          isEditingReply || !review.reply ? (
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="답변을 입력하세요"
            />
          ) : (
            <div className={styles.replyText}>{review.reply.content}</div>
          )
        ) : review.reply ? (
          <div className={styles.replyText}>{review.reply.content}</div>
        ) : (
          <div>아직 답변이 없습니다.</div>
        )}
      </div>

      {/* 하단 버튼 영역 */}
      <div className={styles.buttonWrapper}>
        {loginUserRole === "ADMIN" && (
          <>
            {isEditingReply ? (
              <>
                <button
                  className={styles.btnBefore}
                  onClick={() => setIsEditingReply(false)}
                >
                  취소하기
                </button>
                <button
                  className={styles.btnSubmit}
                  onClick={handleSubmitReply}
                >
                  등록하기
                </button>
              </>
            ) : (
              <button
                className={styles.btnSubmit}
                onClick={() => setIsEditingReply(true)}
              >
                {review.reply ? "수정하기" : "등록하기"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
