"use client";

import Image from "next/image";
import * as R from "./style";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";

type FormValues = {
  rating: number;
  content: string;
  images: (File | null)[];
};

const schema = yup.object({
  rating: yup.number().min(1, "별점을 선택해주세요").required(),
  content: yup.string().min(5, "리뷰 내용을 입력해주세요").required(),
  images: yup
    .array()
    .max(3, "이미지는 최대 3장까지 업로드 가능합니다")
    .of(yup.mixed().nullable()),
});

export default function ReviewNewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderItemId = searchParams.get("orderItemId"); // ✅ 여기서 가져오기

  const { data: session, status } = useSession();
  const loginUserId = session?.user?.id;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { rating: 0, content: "", images: [null, null, null] },
  });

  const images = watch("images");

  const data = {
    productId: "1",
    productName: "아디다스 품새도복",
    img: "/images/sample.jpg",
  };

  const handleFormSubmit = async (formData: FormValues) => {
    if (!orderItemId) return alert("주문 상품 ID가 없습니다!");

    try {
      const fd = new FormData();
      fd.append("userId", loginUserId.toString());
      fd.append("productId", data.productId);
      fd.append("orderItemId", orderItemId);
      fd.append("rating", formData.rating.toString());
      fd.append("content", formData.content);
      formData.images.forEach((img) => img && fd.append("images", img));

      const res = await fetch("/api/mypage/review/new", {
        method: "POST",
        body: fd,
      });

      const result = await res.json(); // ✅ 여기서 JSON으로 받아야 함

      if (!res.ok) throw new Error("리뷰 등록 실패");

      alert("리뷰가 등록되었습니다!");
      router.push(`/mypage/review/${result.reviewId}`); // 상세 페이지로 이동
    } catch {
      alert("리뷰 등록 중 오류가 발생했습니다");
    }
  };

  const handleChangeImage = (index: number, file: File) => {
    setValue(`images.${index}`, file);
  };

  const handleRemoveImage = (index: number) => {
    setValue(`images.${index}`, null);
  };

  return (
    <R.Wrapper>
      <R.Title>상품 후기</R.Title>
      <R.Line />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <R.ProductCard>
          <Image src={data.img} alt={data.productName} width={90} height={90} />
          <R.ProductInfo>
            <R.Date>등록일:2025.10.10</R.Date>
            <R.P_Info_Top>
              <R.P_name>{data.productName}</R.P_name>
              <R.P_option>빨간색</R.P_option>
            </R.P_Info_Top>
            <R.Stars>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <R.Star
                        key={n}
                        $active={field.value >= n}
                        onClick={() => field.onChange(n)}
                      >
                        ★
                      </R.Star>
                    ))}
                  </>
                )}
              />
            </R.Stars>
            {errors.rating && (
              <R.ErrorText>{errors.rating.message}</R.ErrorText>
            )}
          </R.ProductInfo>
        </R.ProductCard>

        <R.Section>
          <R.TextArea
            {...register("content")}
            placeholder="사용해보니 어땠나요?"
          />
          {errors.content && (
            <R.ErrorText>{errors.content.message}</R.ErrorText>
          )}
        </R.Section>

        <R.Container>
          {images.map((img, idx) => {
            const preview = img ? URL.createObjectURL(img) : "";
            return (
              <R.ImageBox key={idx}>
                {preview ? (
                  <>
                    <R.Preview src={preview} alt={`preview-${idx}`} />
                    <R.RemoveButton
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                    >
                      ×
                    </R.RemoveButton>
                  </>
                ) : (
                  <R.Label>
                    +
                    <R.FileInput
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files &&
                        handleChangeImage(idx, e.target.files[0])
                      }
                    />
                  </R.Label>
                )}
              </R.ImageBox>
            );
          })}
          {errors.images && <R.ErrorText>{errors.images.message}</R.ErrorText>}
        </R.Container>

        <R.Button_Wrapper>
          <R.B_Cancel type="button">취소하기</R.B_Cancel>
          <R.B_Upload type="submit" disabled={isSubmitting}>
            {isSubmitting ? "등록 중..." : "등록하기"}
          </R.B_Upload>
        </R.Button_Wrapper>
      </form>
    </R.Wrapper>
  );
}
