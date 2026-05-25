"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import { ClipboardPen, Phone, MessageCircle } from "lucide-react";
import ProductSelectModal from "../_component/ProductSelectModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { createEstimateSchema } from "@/schema/estimateSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export interface ProductItem {
  id: number;
  name: string;
  thumbnail: string;
}

interface EstimateFormValues {
  writer: string;
  phone: string;
  email: string;
  password?: string;
  title: string;
  content: string;
}

export default function EstimateNewClientPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null,
  );

  const schema = createEstimateSchema(isLoggedIn);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EstimateFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      writer: session?.user?.nickname || "",
      phone: "",
      email: session?.user?.email || "",
      password: "",
      title: "",
      content: "",
    },
  });

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, "");

    if (numbers.length < 4) return numbers;

    if (numbers.length < 8) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    }

    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const onSubmit = async (values: EstimateFormValues) => {
    try {
      if (!selectedProduct) {
        toast("상품을 선택해주세요.");

        return;
      }

      const response = await fetch("/api/estimate", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...values,
          productId: selectedProduct.id,
          password: isLoggedIn ? null : values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast(data.message || "견적문의 등록에 실패했습니다.");

        return;
      }

      toast("견적문의가 등록되었습니다.");

      router.push("/estimate");
    } catch (error) {
      console.error(error);

      toast("견적문의 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.infoGrid}>
        <article>
          <ClipboardPen size={22} />

          <h3>맞춤 견적</h3>

          <p>수량 / 옵션 / 인쇄 여부에 따라 최적의 견적을 안내해드립니다.</p>
        </article>

        <article>
          <Phone size={22} />

          <h3>빠른 상담</h3>

          <p>담당자가 문의 확인 후 빠르게 연락드립니다.</p>
        </article>

        <article>
          <MessageCircle size={22} />

          <h3>단체 주문 문의</h3>

          <p>도장 / 학교 / 행사 단체 주문도 편하게 문의해주세요.</p>
        </article>
      </section>

      <section className={styles.formSection}>
        <div className={styles.formHeader}>
          <h2>문의 작성</h2>

          <p>아래 내용을 입력해주시면 빠르게 답변드리겠습니다.</p>
        </div>

        <div className={styles.memberNotice}>
          {isLoggedIn ? (
            <div className={styles.memberBox}>
              <strong>회원 문의</strong>

              <p>
                로그인 상태로 문의 작성 중입니다.
                <br />
                마이페이지에서 문의 내역을 확인할 수 있습니다.
              </p>
            </div>
          ) : (
            <div className={styles.guestBox}>
              <strong>비회원 문의</strong>

              <p>비회원 문의는 비밀번호 인증 후 조회 가능합니다.</p>

              <Link href="/login">로그인하기</Link>
            </div>
          )}
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputGroup}>
            <label>이름</label>

            <input
              type="text"
              placeholder="이름을 입력해주세요"
              {...register("writer")}
            />

            {errors.writer && (
              <p className={styles.error}>{errors.writer.message}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>연락처</label>

            <input
              type="text"
              placeholder="010-0000-0000"
              maxLength={13}
              {...register("phone")}
              onChange={(e) => {
                e.target.value = formatPhoneNumber(e.target.value);
              }}
            />

            {errors.phone && (
              <p className={styles.error}>{errors.phone.message}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>이메일</label>

            <input
              type="email"
              placeholder="example@email.com"
              {...register("email")}
            />

            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          {!isLoggedIn && (
            <div className={styles.inputGroup}>
              <label>비밀번호</label>

              <input
                type="password"
                placeholder="게시글 확인 시 사용할 비밀번호"
                {...register("password")}
              />

              <p className={styles.helpText}>
                문의 조회 및 수정 시 사용됩니다.
              </p>

              {errors.password && (
                <p className={styles.error}>{errors.password.message}</p>
              )}
            </div>
          )}

          <section className={styles.productSection}>
            <div className={styles.productHeader}>
              <h3>상품 선택</h3>

              <p>견적을 원하는 상품을 선택해주세요.</p>
            </div>

            <button
              type="button"
              className={styles.productSelectButton}
              onClick={() => setOpen(true)}
            >
              상품 선택하기
            </button>

            <ProductSelectModal
              open={open}
              onClose={() => setOpen(false)}
              onSelect={(product) => {
                setSelectedProduct(product);

                setOpen(false);
              }}
            />

            {selectedProduct && (
              <div className={styles.selectedProduct}>
                <img
                  src={selectedProduct.thumbnail}
                  alt={selectedProduct.name}
                  className={styles.thumbnail}
                />

                <div className={styles.productInfo}>
                  <strong>{selectedProduct.name}</strong>

                  <span>상품 선택 완료</span>
                </div>
              </div>
            )}
          </section>

          <div className={styles.inputGroup}>
            <label>문의 제목</label>

            <input
              type="text"
              placeholder="문의 제목을 입력해주세요"
              {...register("title")}
            />

            {errors.title && (
              <p className={styles.error}>{errors.title.message}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>문의 내용</label>

            <textarea
              rows={8}
              placeholder="수량 / 사이즈 / 원하시는 상품 등을 자유롭게 작성해주세요"
              {...register("content")}
            />

            {errors.content && (
              <p className={styles.error}>{errors.content.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "등록 중..." : "견적문의 보내기"}
          </button>
        </form>
      </section>
    </main>
  );
}
