"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import * as R from "./style";

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
  const [replyContent, setReplyContent] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const loginUserRole = session?.user?.role?.toLowerCase(); // admin / user

  useEffect(() => {
    if (!reviewId) return;

    const fetchReview = async () => {
      try {
        const res = await fetch(`/api/mypage/review/${reviewId}`);
        if (!res.ok) throw new Error("리뷰 가져오기 실패");
        const data = await res.json();
        setReview(data);
      } catch (err) {
        console.error(err);
        setReview(null); // 실패 시 로딩 멈추게
      }
    };

    fetchReview();
  }, [reviewId]);

  if (!review) return <R.Wrapper>로딩중...</R.Wrapper>;

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
      setReview((prev: any) => ({ ...prev, reply: updated }));
      setReplyContent("");
      alert("답변이 등록되었습니다!");
    } catch (err) {
      console.error(err);
      alert("답변 등록 중 오류가 발생했습니다");
    }
  };

  return (
    <R.Wrapper>
      <R.Title>리뷰 상세</R.Title>
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

      <R.Contents>
        {/* 본문 */}
        <R.Section>{review.content}</R.Section>

        {/* 이미지 있으면 첨부 */}
        {review.images.length > 0 && (
          <R.Container>
            {review.images.map((img, idx) => (
              <R.ImageBox key={idx}>
                <R.Preview src={img} alt={`review-image-${idx}`} />
              </R.ImageBox>
            ))}
          </R.Container>
        )}
      </R.Contents>

      <R.Answer>
        <h3>답변</h3>
        {review.reply ? (
          <R.ReplyText>{review.reply.content}</R.ReplyText>
        ) : loginUserRole === "admin" ? (
          <R.Textarea_Admin
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="답변을 입력하세요"
          />
        ) : (
          <R.Textarea_User
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="아직 답변이 입력되지 않았습니다"
          />
        )}
      </R.Answer>

      <R.Button_Wrapper>
        <R.Button_before onClick={() => router.push("/mypage/review")}>
          목록으로
        </R.Button_before>

        {loginUserRole === "admin" && (
          <R.Button_submit onClick={handleSubmitReply}>
            {review.reply ? "수정하기" : "등록하기"}
          </R.Button_submit>
        )}
      </R.Button_Wrapper>
    </R.Wrapper>
  );
}
