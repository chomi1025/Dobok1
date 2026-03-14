"use client";
import { useEffect, useState } from "react";
import React from "react";
import * as A from "./style";
import { useFormContext } from "react-hook-form";

interface CategoryChild {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  children?: CategoryChild[];
}

export default function ProductInfoComponent() {
  const { register, setValue } = useFormContext();
  const [category, setCategory] = useState<Category[]>([]);
  const [selectedParent, setSelectedParent] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await fetch("/api/categories");
      const data = await result.json();
      setCategory(data);
    };

    fetchCategory();
  }, []);

  return (
    <A.Section variant="ProductInfo">
      <h3>기본 정보 </h3>
      <hr />

      <A.SmallSection variant="ProductName">
        <label htmlFor="name">상품명 *</label>
        <input
          {...register("name")}
          id="name"
          defaultValue=""
          autoComplete="one-time-code"
        />
      </A.SmallSection>

      <A.SmallSection variant="category">
        <label htmlFor="Category">카테고리 *</label>

        {category?.length > 0 ? (
          <div>
            <div>
              <select
                onChange={(e) => {
                  const parentId = Number(e.target.value);
                  setSelectedParent(parentId);
                  setValue("parentCategoryId", parentId);
                  setValue("categoryId", null);
                }}
              >
                <A.HiddenOption value="" hidden>
                  1차 카테고리
                </A.HiddenOption>
                {category?.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
              <span>▼</span>
            </div>

            <div>
              <select
                onChange={(e) => {
                  const childId = Number(e.target.value);
                  setValue("categoryId", childId);
                }}
              >
                <A.HiddenOption value="" hidden>
                  2차 카테고리
                </A.HiddenOption>
                {category
                  ?.find((el) => el.id === selectedParent)
                  ?.children?.map((child) => (
                    <option key={child.id} value={child.id}>
                      {child.name}
                    </option>
                  ))}
              </select>
              <span>▼</span>
            </div>
          </div>
        ) : (
          <div style={{ minHeight: "45px" }}>
            <span>카테고리 로딩 중...</span>
          </div>
        )}
      </A.SmallSection>

      <A.SmallSection variant="origin">
        <label htmlFor="ProductName">제조국 *</label>
        <input
          type="text"
          id="origin"
          placeholder="제조국을 입력해주세요."
          {...register("origin")}
        />
      </A.SmallSection>

      <A.SmallSection variant="matter">
        <label htmlFor="ProductName">소재 *</label>
        <textarea
          id="material"
          placeholder={
            "예)\n겉감 : 나일론 87%, 폴리우레탄 13%\n안감 : 나일론 100%"
          }
          {...register("material")}
        />
      </A.SmallSection>
    </A.Section>
  );
}
