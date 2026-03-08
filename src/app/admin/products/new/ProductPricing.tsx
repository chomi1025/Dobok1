"use client";
import * as A from "./style";
import { Table } from "@/components/Table/page";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { TabButton } from "@/components/style";
import { ProductFormValues } from "./page.client";

interface TableRow extends ProductOption {
  __index: number;
  id: number;
}

const STATUS_LABEL = {
  ONSALE: "판매중",
  SOLDOUT: "품절",
  HIDDEN: "숨김",
};

export interface ProductOption {
  color?: string;
  size?: string;
  price: number;
  stock: number;
  sale?: number;
  status: string;
}

export default function ProductPricingComponent() {
  const {
    register,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useFormContext<ProductFormValues>();

  const optionType = useWatch({
    control,
    name: "optionsType",
  });

  const singleStatus = useWatch({
    control,
    name: "options.0.status",
  });

  const { fields, append, remove } = useFieldArray<
    ProductFormValues,
    "options"
  >({
    name: "options",
    control,
  });

  const handleTabChange = (type: "single" | "option") => {
    setValue("optionsType", type);

    const emptyOption = {
      stock: "" as any,
      price: "" as any,
      sale: "" as any,
      status: "ONSALE",
      color: "",
      size: "",
    };

    if (type === "single") {
      reset((prev) => ({ ...prev, options: [emptyOption] }));
    }

    if (type === "option") {
      reset((prev) => ({ ...prev, options: [emptyOption] }));
    }
  };

  const PricingColumns: {
    key: string;
    label: string;
    flex: number;
    render: (row: TableRow) => React.ReactNode;
  }[] = [
    {
      key: "color",
      label: "색상",
      flex: 1.2,
      render: (row: TableRow) => (
        <input
          style={{ width: "90%", padding: "12px 15px" }}
          {...register(`options.${row.__index}.color`)}
          defaultValue={row.color}
        />
      ),
    },
    {
      key: "size",
      label: "사이즈",
      flex: 1.2,
      render: (row) => (
        <input
          style={{ width: "90%", padding: "12px 15px" }}
          {...register(`options.${row.__index}.size`)}
          defaultValue={row.size}
        />
      ),
    },
    {
      key: "stock",
      label: "재고 *",
      flex: 1,
      render: (row) => (
        <input
          type="number"
          style={{ width: "90%", padding: "12px 15px" }}
          {...register(`options.${row.__index}.stock`)}
        />
      ),
    },
    {
      key: "price",
      label: "가격 *",
      flex: 1.3,
      render: (row) => (
        <input
          type="number"
          style={{ width: "90%", padding: "12px 15px" }}
          {...register(`options.${row.__index}.price`)}
          defaultValue={row.price}
        />
      ),
    },
    {
      key: "sale",
      label: "할인",
      flex: 1,
      render: (row) => (
        <input
          type="number"
          style={{ width: "90%", padding: "12px 15px" }}
          {...register(`options.${row.__index}.sale`, {
            setValueAs: (v) => (v === "" || v === null ? 0 : Number(v)),
          })}
          defaultValue={row.sale}
        />
      ),
    },
    {
      key: "status",
      label: "판매상태",
      flex: 1.2,
      render: (row) => (
        <div style={{ width: "90%", position: "relative" }}>
          <select
            style={{ width: "100%", padding: "12px 15px" }}
            {...register(`options.${row.__index}.status`)}
          >
            <option value="ONSALE">판매중</option>
            <option value="SOLDOUT">품절</option>
            <option value="HIDDEN">숨기기</option>
          </select>

          <span
            style={{
              fontSize: "11px",
              position: "absolute",
              top: "50%",
              right: "10%",
              transform: "translateY(-50%)",
            }}
          >
            ▼
          </span>
        </div>
      ),
    },
    {
      key: "delete",
      label: "삭제",
      flex: 0.6,
      render: (row) => (
        <button type="button" onClick={() => remove(row.__index)}>
          ✕
        </button>
      ),
    },
  ];

  return (
    <A.Section variant="productPricing">
      <A.OptionsTitleWrapper>
        <h3>재고/가격</h3>

        <A.OptionsButtonWrapper>
          <TabButton
            type="button"
            active={optionType === "single"}
            onClick={() => handleTabChange("single")}
          >
            단품
          </TabButton>
          <TabButton
            type="button"
            active={optionType === "option"}
            onClick={() => handleTabChange("option")}
          >
            옵션
          </TabButton>
        </A.OptionsButtonWrapper>
      </A.OptionsTitleWrapper>

      {optionType === "single" && (
        <A.SingleWrapper>
          <hr />

          <A.SmallSection variant="status">
            <label htmlFor="ProductName">상태 *</label>
            <div>
              {Object.entries(STATUS_LABEL).map(([key, value]) => {
                return (
                  <A.StatusButton
                    key={key}
                    type="button"
                    onClick={() =>
                      setValue("options.0.status", key, {
                        shouldValidate: true,
                      })
                    }
                    active={singleStatus === key}
                  >
                    {value}
                  </A.StatusButton>
                );
              })}
            </div>
          </A.SmallSection>

          <A.SmallSection variant="stock">
            <div>
              <label htmlFor="singleStock">재고 *</label>
              <input
                type="number"
                placeholder="재고를 입력해주세요."
                {...register("options.0.stock", { valueAsNumber: true })}
              />
            </div>
            <div>
              <label htmlFor="singlePrice">가격 *</label>
              <input
                type="number"
                placeholder="가격을 입력해주세요."
                {...register("options.0.price", { valueAsNumber: true })}
              />
            </div>

            <div>
              <label htmlFor="sale">할인</label>
              <input
                type="number"
                placeholder="할인가를 입력해주세요."
                {...register("options.0.sale", {
                  setValueAs: (v) => (v === "" || v === null ? 0 : Number(v)),
                })}
              />
            </div>
          </A.SmallSection>
        </A.SingleWrapper>
      )}

      {optionType == "option" && (
        <A.OptionWrapper>
          <A.PriceWrapper>
            <Table
              columns={PricingColumns}
              data={fields.map((field, index) => ({
                ...field,
                __index: index,
                id: index,
              }))}
              pricing
            />
          </A.PriceWrapper>

          <A.AddOptionButton
            type="button"
            onClick={() =>
              append({
                color: "",
                size: "",
                stock: null as any,
                price: null as any,
                sale: null as any,
                status: "ONSALE",
              })
            }
          >
            + 옵션 추가
          </A.AddOptionButton>
        </A.OptionWrapper>
      )}
    </A.Section>
  );
}
