import Image from "next/image";
import styles from "./ProductInfo.module.scss";
import { ProductOption } from "@/types/types";
import Button from "@/components/common/buttons/page";
import { ProductFull } from "./page.client";

export interface SelectedOption extends ProductOption {
  quantity: number;
}

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

export default function ProductInfo({
  product,
  addedOptions,
  selectedOption1,
  selectedOption2,
  option1List,
  option2List,
  onSelectOption1,
  onSelectOption2,
  getFinalPrice,
  updateQty,
  removeOption,
  handleAddToCart,
  isPending,
  hasOption2,
}: Props) {
  const baseOption = product.options[0];
  const finalPrice = getFinalPrice(baseOption);
  const originalPrice = baseOption.price;

  console.log(product.options);
  const discountPercent =
    originalPrice > finalPrice
      ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
      : 0;

  const isDiscounted = originalPrice !== finalPrice;

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
                  <span>
                    {getFinalPrice(product.options[0]).toLocaleString()}
                  </span>
                </strong>
                원
                {isDiscounted && (
                  <span className={styles.originalPrice}>
                    {originalPrice.toLocaleString()}원
                  </span>
                )}
                {isDiscounted && (
                  <span className={styles.discountPercent}>
                    {discountPercent}%
                  </span>
                )}
              </div>
            </div>

            <div className={styles.delevery}>
              <h3>배송비</h3>
              <p>2,500원 (50,000원 이상 구매 시 무료배송)</p>
            </div>

            {/* 옵션1 */}
            <div className={styles.optionArea}>
              {option1List.length > 0 && (
                <div className={styles.optionGroup}>
                  <label>{product.options[0]?.optionName || "옵션"}</label>
                  <ul>
                    {option1List.map((option) => (
                      <li
                        key={option}
                        onClick={() => onSelectOption1(option)}
                        className={
                          selectedOption1 === option ? styles.active : ""
                        }
                      >
                        <button type="button"> {option}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 옵션 */}
              {hasOption2 &&
                option1List.length > 0 &&
                option2List.length > 0 && (
                  <div className={styles.optionGroup}>
                    <label>
                      {product.options[0]?.optionName2 || "세부 옵션"}
                    </label>

                    <ul>
                      {option2List.map((option) => (
                        <li
                          key={option}
                          onClick={() => onSelectOption2(option)}
                          className={
                            selectedOption2 === option ? styles.active : ""
                          }
                        >
                          <button type="button">{option}</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* 선택목록 */}
            <div className={styles.selectedListArea}>
              {addedOptions.map((item) => {
                const final = getFinalPrice(item);
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
                              acc + getFinalPrice(curr) * curr.quantity,
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

        {/* 탭 */}
      </section>
    </>
  );
}
