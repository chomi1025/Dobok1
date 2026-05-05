import Image from "next/image";
import styles from "./ProductInfo.module.scss";
import { ProductWithCategory, ProductOption } from "@/types/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "@/components/common/buttons/page";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { customConfirm } from "@/lib/swal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SelectedOption extends ProductOption {
  quantity: number;
}

interface Props {
  product: ProductWithCategory;
  session: Session | null;
  addedOptions: SelectedOption[];
  setAddedOptions: React.Dispatch<React.SetStateAction<SelectedOption[]>>;
}

export default function ProductInfo({
  session,
  product,
  addedOptions,
  setAddedOptions,
}: Props) {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const colorOptions = Array.from(
    new Set(product.options.map((o) => o.optionValue).filter(Boolean)),
  );

  const availableOptionsByColor = selectedColor
    ? product.options.filter(
        (o) =>
          o.optionValue === selectedColor || o.optionValue2 === selectedColor,
      )
    : product.options;

  const sizeOptions = Array.from(
    new Set(availableOptionsByColor.map((o) => o.optionValue2).filter(Boolean)),
  );

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
    setSelectedSize(null);
  };

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);

    const targetOpt = product.options.find((opt) => {
      const colorMatch =
        !colorOptions.length || opt.optionValue === selectedColor;
      const sizeMatch = !sizeOptions.length || opt.optionValue2 === size;
      return colorMatch && sizeMatch;
    });

    if (targetOpt) {
      const isAlreadyAdded = addedOptions.find(
        (item) => item.id === targetOpt.id,
      );

      if (isAlreadyAdded) {
        toast("이미 선택한 옵션입니다.");
        setSelectedColor(null);
        setSelectedSize(null);
        return;
      }

      addOption(targetOpt);
      setSelectedColor(null);
      setSelectedSize(null);
    }
  };

  const addOption = (opt: ProductOption) => {
    const isAlreadyAdded = addedOptions.find((item) => item.id === opt.id);
    if (isAlreadyAdded) return;
    setAddedOptions((prev) => [...prev, { ...opt, quantity: 1 }]);
  };

  const updateQty = (id: number, delta: number) => {
    setAddedOptions((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeOption = (id: number) => {
    setAddedOptions((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const isSingleProduct =
      product.options.length === 1 &&
      !product.options[0].optionValue &&
      !product.options[0].optionValue2;

    if (isSingleProduct && addedOptions.length === 0) {
      setAddedOptions([{ ...product.options[0], quantity: 1 }]);
    }
  }, [product.options, addedOptions.length, setAddedOptions]);

  // 장바구니 함수
  const queryClient = useQueryClient();

  const { mutate: addToCartMutate, isPending } = useMutation({
    mutationFn: async (
      cartData: { productOptionId: number; quantity: number }[],
    ) => {
      // 로그인
      if (session) {
        const res = await fetch("/api/cart", {
          method: "POST",
          body: JSON.stringify({ items: cartData }),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("장바구니 담기 실패");
        return { type: "member" };
      }

      // 비회원일 때
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = [...existingCart];

      cartData.forEach((newItem) => {
        const foundIndex = updatedCart.findIndex(
          (item: any) => item.productOptionId === newItem.productOptionId,
        );
        if (foundIndex > -1) {
          updatedCart[foundIndex].quantity += newItem.quantity;
        } else {
          updatedCart.push(newItem);
        }
      });

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { type: "guest" };
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      const result = await customConfirm({
        title: "장바구니 담기 완료!",
        text: "장바구니로 이동하시겠습니까?",
        confirmText: "이동하기",
        cancelText: "계속 쇼핑",
        isDanger: false,
      });

      if (result.isConfirmed) {
        router.push("/cart");
      }
    },
    onError: (error) => {
      toast.error("장바구니 담기에 실패했습니다.");
      console.error(error);
    },
  });

  const handleAddToCart = () => {
    if (addedOptions.length === 0) {
      toast("옵션을 선택해주세요!");
      return;
    }

    const cartData = addedOptions.map((opt) => ({
      productId: product.id,
      productOptionId: opt.id,
      quantity: opt.quantity,
    }));

    addToCartMutate(cartData);
  };

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
                  <span>{product.options[0]?.price.toLocaleString()}</span>
                </strong>
                원
              </div>
            </div>

            <div className={styles.delevery}>
              <h3>배송비</h3>
              <p>2,500원 (50,000원 이상 구매 시 무료배송)</p>
            </div>

            {/* 옵션선택한거 */}
            <div className={styles.optionArea}>
              {colorOptions.length > 0 && (
                <div className={styles.optionGroup}>
                  <label>색상 선택</label>
                  <ul>
                    {colorOptions.map((color) => (
                      <li
                        key={color}
                        onClick={() => handleSelectColor(color!)}
                        className={selectedColor === color ? styles.active : ""}
                      >
                        {color}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(selectedColor || colorOptions.length === 0) &&
                sizeOptions.length > 0 && (
                  <div className={styles.optionGroup}>
                    <label>사이즈 선택</label>
                    <ul>
                      {sizeOptions.map((size) => (
                        <li
                          key={size}
                          onClick={() => handleSelectSize(size!)}
                          className={selectedSize === size ? styles.active : ""}
                        >
                          {size}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            <div className={styles.selectedListArea}>
              {addedOptions.map((item) => (
                <div className={styles.selectedItem} key={item.id}>
                  <div className={styles.item_header}>
                    <span className={styles.option_name}>
                      {product.name}
                      {(item.optionValue || item.optionValue2) && (
                        <>
                          - {item.optionValue || ""} {item.optionValue2 || ""}
                        </>
                      )}
                    </span>

                    {product.options.length > 1 && (
                      <button
                        className={styles.remove_btn}
                        onClick={() => removeOption(item.id)}
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* 수량 조절*/}
                  <div className={styles.itemBottom}>
                    <div className={styles.counter}>
                      <button onClick={() => updateQty(item.id, -1)}>−</button>
                      <span className={styles.count}>{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>

                    <strong className={styles.itemPrice}>
                      {(item.price * item.quantity).toLocaleString()}원
                    </strong>
                  </div>
                </div>
              ))}

              <div className={styles.totalAmountArea}>
                <div className={styles.total_label}>총 상품 금액</div>
                <div className={styles.total_price}>
                  {addedOptions.length > 0 ? (
                    <>
                      <strong>
                        {addedOptions
                          .reduce(
                            (acc, curr) => acc + curr.price * curr.quantity,
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
