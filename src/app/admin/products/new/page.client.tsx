"use client";

import * as A from "./style";
import * as yup from "yup";
import ProductInfoComponent from "./productInfo";
import ProductPricingComponent from "./ProductPricing";
import ProductDescriptionComponent from "./ProductDescription";
import { FormProvider, SubmitErrorHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadImage } from "@/lib/supabase/supabaseClient";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

interface ProductImage {
  id: string;
  file: File;
  preview: string;
  url?: string;
}

export interface ProductOption {
  color?: string;
  size?: string;
  price: number;
  stock: number;
  sale?: number;
  status: string;
}

export interface ProductFormValues {
  name: string;
  thumbnail: { file: File; preview: string } | null;
  categoryId: number;
  description: string;
  images: ProductImage[];
  origin: string;
  material: string;
  optionsType: "single" | "option";
  options: ProductOption[];
}

const ProductImagecomponent = dynamic(() => import("./ProductImage"), {
  ssr: false,
  loading: () => (
    <div style={{ minHeight: "645px", marginBottom: "80px" }}>
      이미지 에디터 로딩 중...
    </div>
  ),
});

const FIELD_LABELS: Record<string, string> = {
  name: "상품명",
  thumbnail: "대표 이미지",
  categoryId: "카테고리",
  description: "상품 설명",
  images: "상세 이미지",
  origin: "제조국",
  material: "소재",
  price: "가격",
  stock: "재고",
  sale: "할인",
  status: "판매 상태",
};

const schema: yup.ObjectSchema<ProductFormValues> = yup.object({
  name: yup.string().required(),

  thumbnail: yup
    .object({
      file: yup.mixed<File>().required(),
      preview: yup.string().required(),
    })
    .nullable()
    .required(),

  categoryId: yup.number().required(),
  description: yup.string().required(),

  images: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required(),
        file: yup.mixed<File>().required(),
        preview: yup.string().required(),
        url: yup.string().optional(),
      }),
    )
    .required(),

  origin: yup.string().required(),
  material: yup.string().required(),

  optionsType: yup
    .mixed<"single" | "option">()
    .oneOf(["single", "option"])
    .required(),

  options: yup
    .array()
    .of(
      yup
        .object({
          color: yup.string(),
          size: yup.string(),
          price: yup.number().required().min(1),
          stock: yup.number().required().min(1),
          status: yup.string().required(),
        })
        .test(
          "at-least-one-option",
          "색상이나 사이즈 중 하나는 반드시 입력해야 합니다.",
          function (value) {
            const parentData = this.from?.[1]?.value as
              | ProductFormValues
              | undefined;
            const optionsType = parentData?.optionsType;

            if (!optionsType || optionsType === "single") return true;

            return !!(value.color?.trim() || value.size?.trim());
          },
        ),
    )
    .required()
    .min(1, "최소 한 개의 옵션이 필요합니다."),
});

export default function AdminProductNewClient() {
  const router = useRouter();

  const onInvalid: SubmitErrorHandler<ProductFormValues> = (errors) => {
    const messages: string[] = [];
    console.log(errors);
    if (errors.options && Array.isArray(errors.options)) {
      errors.options.forEach((opt) => {
        if (opt) {
          if ("price" in opt) messages.push(FIELD_LABELS["price"]);
          if ("stock" in opt) messages.push(FIELD_LABELS["stock"]);
        }
      });
    }

    Object.entries(errors).forEach(([key, val]) => {
      if (key !== "options" && val && "message" in val) {
        messages.push(FIELD_LABELS[key] || (key as string));
      }
    });

    if (messages.length > 0) {
      const uniqueMessages = Array.from(new Set(messages));
      alert(`필수값을 입력하지 않았습니다.\n${uniqueMessages.join(", ")}`);
    }
  };

  const methods = useForm<ProductFormValues>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      optionsType: "single",
      description: "",
      images: [],
      thumbnail: null,
      origin: "",
      material: "",
      options: [
        {
          stock: "" as any,
          price: "" as any,
          sale: "" as any,
          status: "ONSALE",
          color: "",
          size: "",
        },
      ],
      categoryId: 0,
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      // 썸네일 업로드
      let thumbnailUrl: string | null = null;
      if (data.thumbnail?.file) {
        thumbnailUrl = await uploadImage(data.thumbnail.file, "thumbnails");
      }

      // 상세 이미지 업로드
      const imagesUrls = await Promise.all(
        (data.images || []).map(async (img) => {
          if (img.file) return await uploadImage(img.file, "details");
          return img.url || null;
        }),
      );

      const payload = {
        ...data,
        thumbnail: thumbnailUrl,
        images: imagesUrls.filter((url) => url !== null),
      };

      const res = await fetch("/api/admin/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "등록 실패");
      alert(result.message);
      router.push("/admin/products");
    } catch (error: any) {
      alert(error.message || "업로드 중 오류 발생");
    }
  };

  return (
    <>
      <A.Inner>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, onInvalid)}>
            <h2>상품 관리(추가)</h2>

            {/* 상품 이미지 관련 */}
            <ProductImagecomponent />

            {/* 상품 기본정보 */}
            <ProductInfoComponent />

            {/* 상품 재고,가격정보 */}
            <ProductPricingComponent />

            {/* 상품 상세설명 */}
            <ProductDescriptionComponent />

            {/* 상품등록 버튼 */}
            <A.ButtonWrapper>
              <button type="button">취소하기</button>
              <button type="submit"> 등록하기</button>
            </A.ButtonWrapper>
          </form>
        </FormProvider>
      </A.Inner>
    </>
  );
}
