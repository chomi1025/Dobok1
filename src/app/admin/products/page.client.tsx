"use client";
import { useEffect, useState } from "react";
import * as A from "./style";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as yup from "yup";
import { Column, Table } from "@/components/Table/page";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, useWatch } from "react-hook-form";
import PagenationComponent from "@/components/pagenation/page";
import styled from "@emotion/styled";

const STATUS_LABEL = {
  ALL: "전체",
  ONSALE: "판매중",
  SOLDOUT: "품절",
  HIDDEN: "숨김",
};

const STATUS_MAP = {
  ONSALE: { color: "#2ecc71", label: "판매 중" },
  SOLDOUT: { color: "#e74c3c", label: "품절" },
  HIDDEN: { color: "#95a5a6", label: "숨김 처리" },
};

interface Category {
  id: string | number;
  name: string;
  parentId?: string | number;
}

interface CategoryWithChildren extends Category {
  children: Category[];
}

interface AdminProductFilterForm {
  status: "ALL" | "ONSALE" | "SOLDOUT" | "HIDDEN";
  mainCategory: string;
  subCategory: string;
  keyword: string;
}

interface ProductType {
  id: number;
  name: string;
  description: string | null;
  thumbnail: string | null;
  images: string[];
  material: string | null;
  origin: string | null;
  createdAt: Date | string;
  categoryId: number;
  options: any[];
  category: any;
}

interface Props {
  products: ProductType[];
  totalPages: number;
  categories: CategoryWithChildren;
}

const schema: yup.ObjectSchema<AdminProductFilterForm> = yup
  .object({
    status: yup
      .mixed<AdminProductFilterForm["status"]>()
      .oneOf(["ALL", "ONSALE", "SOLDOUT", "HIDDEN"])
      .required(),
    mainCategory: yup.string(),
    subCategory: yup.string(),
    keyword: yup.string().required(),
  })
  .required();

export const StatusWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: help;

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px 10px;
    background-color: rgba(0, 0, 0, 0.85);
    color: #fff;
    font-size: 12px;
    white-space: nowrap; // 줄바꿈 방지
    border-radius: 4px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    z-index: 10;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 110%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.85) transparent transparent transparent;

    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    z-index: 10;
  }

  &:hover::after,
  &:hover::before {
    opacity: 1;
    visibility: visible;
  }
`;

export const StatusCircle = styled.span<{ color: string }>`
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export default function AdminProductClientPage({
  products,
  totalPages,
  categories, // 서버에서 넘겨준 데이터
}: Props) {
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log(searchParams);
  const { control, handleSubmit, register, setValue, reset } =
    useForm<AdminProductFilterForm>({
      defaultValues: {
        status: "ALL",
        mainCategory: "",
        subCategory: "",
        keyword: "",
      },
      resolver: yupResolver(schema),
    });

  useEffect(() => {
    reset({
      status: (searchParams.get("status") as any) || "ALL",
      mainCategory: searchParams.get("mainId") || "",
      subCategory: searchParams.get("subId") || "",
      keyword: searchParams.get("q") || "",
    });
  }, [searchParams, reset]);

  const selectedMainId = useWatch<AdminProductFilterForm>({
    control,
    name: "mainCategory",
  });
  const selectedStatus = useWatch<AdminProductFilterForm>({
    control,
    name: "status",
  });

  const [productStatus, setProductStatus] = useState("ALL");
  const [keyword, setKeyword] = useState("");

  const onSubmit = (values: AdminProductFilterForm) => {
    console.log("검색 필터 값:", values);
    const params = new URLSearchParams();

    if (values.status !== "ALL") params.set("status", values.status);
    if (values.mainCategory) params.set("mainId", values.mainCategory);
    if (values.subCategory) params.set("subId", values.subCategory);
    if (values.keyword) params.set("q", values.keyword);

    params.set("page", "1");

    route.push(`${pathname}?${params.toString()}`);
  };

  const onReset = () => {
    reset({
      status: "ALL",
      mainCategory: "",
      subCategory: "",
      keyword: "",
    });
    route.push(pathname);
  };

  const ProductColumns: Column<ProductType>[] = [
    {
      key: "name",
      flex: 2.5,
      label: "상품명",
      render: (row) => {
        console.log("주소확인:", row.thumbnail);
        return (
          <div
            style={{
              display: "flex",
              gap: "10px",
              flex: 1,
              alignItems: "center",
              padding: "0 20px",
            }}
          >
            <Image
              width={70}
              height={70}
              src={row.thumbnail || "/no-image.png"}
              style={{ backgroundColor: "black" }}
              alt="일단 임시"
              unoptimized
            />

            <p style={{ flex: 1, textAlign: "left" }}>{row.name}</p>
          </div>
        );
      },
    },

    {
      key: "category",
      flex: 1.5,
      label: "카테고리",
      render: (row) => {
        return (
          <span>
            {row.category?.parent?.name || "대분류"} &gt;{" "}
            {row.category?.name || "소분류"}
          </span>
        );
      },
    },

    {
      key: "price",
      flex: 1,
      label: "판매가",
      render: (row) => {
        return <div>{row?.options?.[0]?.price?.toLocaleString()}원</div>;
      },
    },

    {
      key: "stock",
      flex: 0.8,
      label: "재고",
      render: (row) => {
        return <div>{row?.options?.[0]?.stock?.toLocaleString()}</div>;
      },
    },
    {
      key: "status",
      flex: 0.8,
      label: "상태",
      render: (row) => {
        const uniqueStatusKeys = Array.from(
          new Set(row.options?.map((opt: any) => opt.status)),
        ) as Array<keyof typeof STATUS_MAP>;

        const displayStatuses = uniqueStatusKeys.slice(0, 3);

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              justifyContent: "center",
            }}
          >
            {displayStatuses.map((statusKey) => {
              const config = STATUS_MAP[statusKey];
              if (!config) return null;

              return (
                <StatusWrapper key={statusKey} data-tooltip={config.label}>
                  <StatusCircle color={config.color} />
                </StatusWrapper>
              );
            })}
          </div>
        );
      },
    },
    {
      key: "actions",
      flex: 1,
      label: "관리",
      render: () => {
        return (
          <div style={{ display: "flex", gap: "3px" }}>
            <button
              type="button"
              style={{
                fontSize: "14px",
                border: "1px solid #D1D5DB",
                padding: "7px 10px",
                borderRadius: "3px",
              }}
            >
              수정
            </button>
            <button
              type="button"
              style={{
                fontSize: "14px",
                border: "1px solid #D1D5DB",
                padding: "7px 10px",
                borderRadius: "3px",
                color: "#C1272D",
              }}
            >
              삭제
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <A.Inner>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) =>
          console.log("검색 에러!!:", errors),
        )}
      >
        <A.TitleWrapper>
          <h2>상품 관리</h2>

          <button
            type="button"
            onClick={() => {
              route.push("/admin/products/new");
            }}
          >
            상품추가
          </button>
        </A.TitleWrapper>

        <A.ProductFilter aria-label="상품관리-검색필터">
          <A.FilterStatus>
            <h4>상태</h4>
            <ul role="listbox">
              {Object.entries(STATUS_LABEL).map(([key, value]) => (
                <A.List role="option" active={selectedStatus == key}>
                  <button
                    type="button"
                    onClick={() =>
                      setValue(
                        "status",
                        key as AdminProductFilterForm["status"],
                      )
                    }
                  >
                    {value}
                  </button>
                </A.List>
              ))}
            </ul>
          </A.FilterStatus>

          <A.FilterGroup>
            <A.FilteCategoryStatus>
              <h4>카테고리</h4>

              <Controller
                name="mainCategory"
                control={control}
                render={({ field }) => (
                  <div>
                    <select {...field}>
                      <option value="">전체</option>
                      {categories?.map((main) => (
                        <option key={main.id} value={main.id}>
                          {main.name}
                        </option>
                      ))}
                    </select>
                    <span>▼</span>
                  </div>
                )}
              ></Controller>

              <Controller
                name="subCategory"
                control={control}
                render={({ field }) => {
                  const currentMainCategory = categories.find(
                    (main) => String(main.id) === String(selectedMainId),
                  );

                  return (
                    <div>
                      <select {...field}>
                        <option value="">전체</option>
                        {currentMainCategory?.children.map((sub) => (
                          <option key={sub.id} value={sub.id}>
                            {sub.name}
                          </option>
                        ))}
                      </select>
                      <span>▼</span>
                    </div>
                  );
                }}
              ></Controller>
            </A.FilteCategoryStatus>

            <A.SearchInput>
              <h4>검색</h4>
              <input
                type="text"
                placeholder="상품명 검색"
                {...register("keyword")}
                autoComplete="off"
              />
            </A.SearchInput>

            <A.FilterActions>
              <button type="submit">검색</button>
              <button type="button" onClick={onReset}>
                초기화
              </button>
            </A.FilterActions>
          </A.FilterGroup>
        </A.ProductFilter>

        <Table columns={ProductColumns} data={products} />

        {/* 페이지네이션 컴포넌트 */}
        <PagenationComponent totalPages={totalPages} />
      </form>
    </A.Inner>
  );
}
