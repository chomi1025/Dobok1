import { ProductFull } from "@/app/product/[productId]/page.client";
import { calcDiscountPrice } from "@/utils/calcDiscoutPrice";
import { ProductOption } from "@prisma/client";
import { useState } from "react";
import toast from "react-hot-toast";

type AddedOption = ProductOption & {
  quantity: number;
};

export function useProductOptions(product: ProductFull) {
  const [addedOptions, setAddedOptions] = useState<AddedOption[]>([]);
  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);

  const [isPending, setIsPending] = useState(false);

  const getFinalPrice = (option: ProductOption) => {
    if (option.discountType && option.discountValue) {
      return calcDiscountPrice({
        price: option.price,
        discountType: option.discountType,
        discountValue: option.discountValue,
      });
    }

    if (product.discountType && product.discountValue) {
      return calcDiscountPrice({
        price: option.price,
        discountType: product.discountType,
        discountValue: product.discountValue,
      });
    }

    return option.price;
  };

  const updateQty = (id: number, diff: number) => {
    setAddedOptions((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + diff) }
          : item,
      ),
    );
  };

  const removeOption = (id: number) => {
    setAddedOptions((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddToCart = async () => {
    try {
      setIsPending(true);

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: addedOptions.map((item) => ({
            productId: item.productId,
            productOptionId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast(data.message);
        return;
      }

      toast("장바구니에 담았습니다.");
    } catch (error) {
      console.error(error);
      toast("오류가 발생했습니다.");
    } finally {
      setIsPending(false);
    }
  };

  //   1차
  const option1List = Array.from(
    new Set(
      product.options
        .map((o) => o.optionValue)
        .filter((v): v is string => v !== null && v !== undefined),
    ),
  );

  //   2차
  const option2List = Array.from(
    new Set(
      product.options
        .filter((o) => !selectedOption1 || o.optionValue === selectedOption1)
        .map((o) => o.optionValue2)
        .filter((v): v is string => v !== null && v !== undefined),
    ),
  );

  const hasOption2 = product.options.some((o) => !!o.optionValue2);

  // 1차옵션 선택
  const onSelectOption1 = (value: string) => {
    setSelectedOption1(value);
    setSelectedOption2(null);

    if (!hasOption2) {
      const target = product.options.find((opt) => opt.optionValue === value);

      if (!target) return;

      setAddedOptions((prev) => {
        if (prev.find((p) => p.id === target.id)) return prev;
        return [...prev, { ...target, quantity: 1 }];
      });

      return;
    }
  };

  // 2차옵션 선택
  const onSelectOption2 = (value: string) => {
    // 단일 옵션
    if (!hasOption2) {
      const target = product.options.find((opt) => opt.optionValue === value);

      if (!target) return;

      setAddedOptions((prev) => {
        if (prev.find((p) => p.id === target.id)) return prev;
        return [...prev, { ...target, quantity: 1 }];
      });

      return;
    }

    // 2단
    const target = product.options.find(
      (opt) => opt.optionValue === value && !opt.optionValue2,
    );

    if (!target) return;

    setAddedOptions((prev) => {
      if (prev.find((p) => p.id === target.id)) return prev;
      return [...prev, { ...target, quantity: 1 }];
    });

    setSelectedOption1(null);
    setSelectedOption2(null);
  };

  return {
    addedOptions,
    setAddedOptions,
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
  };
}
