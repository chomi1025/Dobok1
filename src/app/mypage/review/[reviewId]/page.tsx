"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import * as R from "./style";
import ReviewEditor from "@/components/mypage/ReviewEditor";

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
};

export default function ReviewDetailPage() {
  const params = useParams();
  const reviewId = params.reviewId;
  const [review, setReview] = useState<any>(null);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [reviewContent, setReviewContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const loginUserRole = session?.user?.role?.toLowerCase(); // admin / user

  const [isEditingReply, setIsEditingReply] = useState(false);

  // 리뷰 가져오기
  useEffect(() => {
    if (!reviewId) return;

    const fetchReview = async () => {
      try {
        const res = await fetch(`/api/mypage/review/${reviewId}`);
        if (!res.ok) throw new Error("리뷰 가져오기 실패");
        const data = await res.json();
        setReview(data);

        // TipTap용 content 변환 (줄바꿈 -> <p><br></p>)
        const formatted = data.content
          .split("\n")
          .map((line: string) => (line ? `<p>${line}</p>` : "<p><br></p>"))
          .join("");
        setReviewContent(formatted);
      } catch (err) {
        console.error(err);
        setReview(null);
      }
    };

    fetchReview();
  }, [reviewId]);

  if (!review) return <R.Wrapper>로딩중...</R.Wrapper>;

  // 리뷰수정후 등록함수
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

  // 리뷰삭제
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

  // 댓글등록
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

      setReplyContent(updated.content); // ⭐ 핵심
      setIsEditingReply(false); // ⭐ 핵심

      alert("답변이 등록되었습니다!");
    } catch (err) {
      console.error(err);
      alert("답변 등록 중 오류가 발생했습니다");
    }
  };

  return (
    <R.Wrapper>
      <R.Title>리뷰 상세</R.Title>
      <R.Button_top>
        <button
          onClick={() => {
            setReviewContent(
              review.content +
                review.images.map((src) => `<img src="${src}" />`).join(""),
            );
            setIsEditingReview(true);
          }}
        >
          수정
        </button>
        <button onClick={handleDeleteReview}>삭제</button>
      </R.Button_top>

      <R.Line />

      <R.ProductCard>
        <Image
          src={review.orderItem.product.img}
          alt={review.orderItem.product.name}
          width={90}
          height={90}
        />
        <R.ProductInfo>
          <R.Date>{review.createdAt.slice(0, 10)}</R.Date>
          <R.P_Info_Top>
            <R.P_name>{review.orderItem.product.name}</R.P_name>
            <R.P_option>{review.orderItem.option || "옵션 없음"}</R.P_option>
          </R.P_Info_Top>
          <R.Stars>
            {[1, 2, 3, 4, 5].map((n) => (
              <R.Star key={n} $active={review.rating >= n}>
                ★
              </R.Star>
            ))}
          </R.Stars>
        </R.ProductInfo>
      </R.ProductCard>

      <R.Contents isEditingReview={isEditingReview}>
        {!isEditingReview ? (
          <>
            <R.Section dangerouslySetInnerHTML={{ __html: review.content }} />
          </>
        ) : (
          <>
            {/* ⭐ 여기 */}
            <ReviewEditor
              //key={review.id}
              value={reviewContent}
              onChange={setReviewContent}
            />
          </>
        )}
      </R.Contents>

      {isEditingReview && (
        <R.Button_middle>
          <button
            onClick={() => {
              setIsEditingReview(false);
              setReviewContent(review.content);
            }}
          >
            취소
          </button>
          <button onClick={handleUpdateReview}>등록</button>
        </R.Button_middle>
      )}

      <R.Answer>
        <h3>답변</h3>

        {/* 관리자 */}
        {loginUserRole === "admin" ? (
          isEditingReply || !review.reply ? (
            <R.Textarea_Admin
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="답변을 입력하세요"
            />
          ) : (
            <R.ReplyText>{review.reply.content}</R.ReplyText>
          )
        ) : /* 일반 유저 */
        review.reply ? (
          <R.ReplyText>{review.reply.content}</R.ReplyText>
        ) : (
          <R.Textarea_User
            disabled
            placeholder="아직 답변이 입력되지 않았습니다"
          />
        )}
      </R.Answer>

      <R.Button_Wrapper>
        {loginUserRole === "admin" && (
          <>
            {!review.reply && (
              <R.Button_submit onClick={handleSubmitReply}>
                등록하기
              </R.Button_submit>
            )}

            {review.reply && !isEditingReply && (
              <R.Button_submit
                onClick={() => {
                  setReplyContent(review.reply.content);
                  setIsEditingReply(true);
                }}
              >
                수정하기
              </R.Button_submit>
            )}

            {isEditingReply && (
              <>
                <R.Button_before
                  onClick={() => {
                    setIsEditingReply(false);
                    setReplyContent(review.reply.content);
                  }}
                >
                  취소하기
                </R.Button_before>
                <R.Button_submit onClick={handleSubmitReply}>
                  등록하기
                </R.Button_submit>
              </>
            )}
          </>
        )}
      </R.Button_Wrapper>
    </R.Wrapper>
  );
}
