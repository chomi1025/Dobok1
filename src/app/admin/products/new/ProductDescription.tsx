"use client";
import { useFormContext } from "react-hook-form";
import * as A from "./style";
import { memo } from "react";

function ProductDescriptionComponent() {
  const { register } = useFormContext();
  return (
    <A.Section variant="productDescription">
      <h3>상품설명</h3>

      <hr />

      <A.SmallSection variant="Description">
        <label htmlFor="">상품 설명</label>
        <textarea {...register("description")} />
      </A.SmallSection>
    </A.Section>
  );
}

export default memo(ProductDescriptionComponent);
