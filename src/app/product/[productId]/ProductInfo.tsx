import Image from "next/image";
import styles from "./ProductInfo.module.scss";
import { ProductOption } from "@/types/types";
import Button from "@/components/common/buttons/page";
import { ProductFull } from "./page.client";
import Select from "react-select";

export interface SelectedOption extends ProductOption {
  quantity: number;
}

type DiscountContext = {
  coupon?: any;
  memberDiscount?: any;
};

export type OptionType = {
  id: number;
  label: string;
  value: string;

  price: number;

  originalPrice?: number;

  discountValue?: number;
  discountType?: "PERCENTAGE" | "FIXED";

  discountText?: string;

  stock?: number;
};

export interface Props {
  product: ProductFull;
  addedOptions: SelectedOption[];
  selectedOption1: string | null;
  selectedOption2: string | null;
  option1List: string[];
  option2List: string[];
  onSelectOption1: (value: string) => void;
  onSelectOption2: (value: string) => void;
  getFinalPrice: (option: ProductOption) => number;
  updateQty: (id: number, diff: number) => void;
  removeOption: (id: number) => void;
  handleAddToCart: () => void;
  isPending: boolean;
  hasOption2: boolean;
}

const customStyles = {
  option: (base: any, state: any) => ({
    ...base,

    padding: "8px 10px",
    minHeight: "unset",

    fontSize: 14,

    backgroundColor: state.isFocused ? "#f5f5f5" : "#fff",
    color: "#222",

    cursor: "pointer",
  }),

  control: (base: any) => ({
    ...base,
    minHeight: 40,
    height: 40,

    borderRadius: 8,
    borderColor: "#ddd",
    boxShadow: "none",

    "&:hover": {
      borderColor: "#999",
    },
  }),

  valueContainer: (base: any) => ({
    ...base,
    height: 40,
    padding: "0 12px",
  }),

  input: (base: any) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),

  indicatorsContainer: (base: any) => ({
    ...base,
    height: 40,
  }),
};

function applyDiscount(price: number, d?: any) {
  if (!d) return price;

  if (d.discountType === "PERCENTAGE") {
    return price * (1 - d.discountValue / 100);
  }
  return price - d.discountValue;
}

function getFinalPrice(
  option: ProductOption,
  product: ProductFull,
  context: DiscountContext = {},
) {
  let price = option.price;

  price = applyDiscount(price, option);

  price = applyDiscount(price, product);

  price = applyDiscount(price, context.coupon);

  price = applyDiscount(price, context.memberDiscount);

  return Math.max(price, 0);
}

const formatOptionLabel = (option: OptionType) => (
  <div className={styles.optionRow}>
    <span className={styles.optionName}>{option.label}</span>

    <span className={styles.optionPrice}>
      {option.discountText && (
        <span className={styles.discount}>{option.discountText}</span>
      )}
      <span className={styles.price}>{option.price.toLocaleString()}원</span>
    </span>
  </div>
);

export default function ProductInfo({
  product,
  addedOptions,
  selectedOption1,
  selectedOption2,
  option1List,
  option2List,
  onSelectOption1,
  onSelectOption2,

  updateQty,
  removeOption,
  handleAddToCart,
  isPending,
  hasOption2,
}: Props) {
  const baseOption = product.options[0];

  const finalPrice = getFinalPrice(baseOption, product);
  const originalPrice = baseOption.price;

  // 1차 옵션
  const optionList: OptionType[] = product.options.map((option) => {
    const finalPrice = getFinalPrice(option, product);

    const discountText =
      option.discountValue && option.discountValue > 0
        ? option.discountType === "PERCENTAGE"
          ? `(추가할인 ${option.discountValue}%)`
          : `(추가할인 -${option.discountValue.toLocaleString()}원)`
        : "";

    return {
      id: option.id,
      value: option.optionValue || "",
      label: option.optionValue || "",
      price: finalPrice,
      discountText,
    };
  });

  //2차옵션(있으면)
  const optionList2: OptionType[] = product.options
    .filter((option) => option.optionValue === selectedOption1)
    .map((option) => {
      const finalPrice = getFinalPrice(option, product);

      const discountText =
        option.discountValue && option.discountValue > 0
          ? option.discountType === "PERCENTAGE"
            ? `(추가할인 ${option.discountValue}%)`
            : `(추가할인 -${option.discountValue.toLocaleString()}원)`
          : "";

      return {
        id: option.id,

        value: option.optionValue2 || "",
        label: option.optionValue2 || "",

        price: finalPrice,
        discountText,
      };
    });
  const productDiscountPercent =
    product.discountType === "PERCENTAGE" ? product.discountValue : null;

  const isDiscounted = originalPrice !== finalPrice;

  const optionPrices = product.options.map((o) => getFinalPrice(o, product));

  const minPrice = Math.min(...optionPrices);
  const maxPrice = Math.max(...optionPrices);

  const isRange = minPrice !== maxPrice;

  return (
    <>
      <section className={styles.productInfoArea}>
        <section className={styles.productSummary}>
          <div className={styles.thumbnailArea}>
            <Image
              src={product.thumbnail || "/no-image.png"}
              alt={product.name}
              fill
              sizes="480px"
              priority
            />
          </div>

          <div className={styles.infoWrapper}>
            <h1>{product.name}</h1>
            <hr />

            <div className={styles.price}>
              <div>
                <strong>
                  {minPrice.toLocaleString()}
                  {isRange && ` ~`}
                </strong>
                원
                {isDiscounted && (
                  <span className={styles.originalPrice}>
                    {originalPrice.toLocaleString()}원
                  </span>
                )}
                {isDiscounted && (
                  <span className={styles.discountPercent}>
                    {productDiscountPercent}%
                  </span>
                )}
              </div>
            </div>

            <div className={styles.delevery}>
              <h3>배송비</h3>
              <p>2,500원 (50,000원 이상 구매 시 무료배송)</p>
            </div>

            {/* 옵션1 */}
            {option1List.length > 0 && (
              <Select
                styles={customStyles}
                options={optionList}
                formatOptionLabel={formatOptionLabel}
                value={optionList.find((o) => o.value === selectedOption1)}
                onChange={(opt) => onSelectOption1(opt?.value || "")}
                placeholder="옵션 선택"
              />
            )}

            {hasOption2 && option2List.length > 0 && (
              <Select
                options={optionList2}
                formatOptionLabel={formatOptionLabel}
                value={optionList2.find((o) => o.value === selectedOption2)}
                onChange={(opt) => onSelectOption2(opt?.value || "")}
                placeholder="세부 옵션 선택"
              />
            )}

            {/* 선택목록 */}
            <div className={styles.selectedListArea}>
              {addedOptions.map((item) => {
                const final = getFinalPrice(item, product);
                const origin = item.price;
                const isDisc = origin !== final;

                return (
                  <div className={styles.selectedItem} key={item.id}>
                    <div className={styles.item_header}>
                      <span>
                        {product.name}
                        {item.optionValue && `- ${item.optionValue}`}
                        {item.optionValue2 && ` ${item.optionValue2}`}
                      </span>

                      <button onClick={() => removeOption(item.id)}>✕</button>
                    </div>

                    <div className={styles.itemBottom}>
                      <div className={styles.counter}>
                        <button onClick={() => updateQty(item.id, -1)}>
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, 1)}>+</button>
                      </div>

                      <div className={styles.priceArea}>
                        {isDisc && (
                          <span className={styles.originPrice}>
                            {(origin * item.quantity).toLocaleString()}원
                          </span>
                        )}

                        <strong className={styles.finalPrice}>
                          {(final * item.quantity).toLocaleString()}원
                        </strong>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className={styles.totalAmountArea}>
                <div className={styles.total_label}>총 상품 금액</div>
                <div className={styles.total_price}>
                  {addedOptions.length > 0 ? (
                    <>
                      <strong>
                        {addedOptions
                          .reduce(
                            (acc, curr) =>
                              acc +
                              getFinalPrice(curr, product) * curr.quantity,
                            0,
                          )
                          .toLocaleString()}
                      </strong>
                      <span>원</span>
                    </>
                  ) : (
                    <>
                      <strong>0</strong>
                      <span>원</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.buttonArea}>
              <Button
                variant="edit"
                onClick={handleAddToCart}
                disabled={isPending}
              >
                {isPending ? "담는 중..." : "장바구니"}
              </Button>
              <Button variant="black">구매하기</Button>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
