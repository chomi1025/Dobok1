import { PromotionType } from "@prisma/client";

interface DiscountProps {
  price: number;
  discountType?: PromotionType | null;
  discountValue?: number | null;
}

export function calcDiscountPrice({
  price,
  discountType,
  discountValue,
}: DiscountProps) {
  if (!discountType || !discountValue) {
    return price;
  }

  if (discountType === "PERCENTAGE") {
    return Math.floor(price - price * (discountValue / 100));
  }

  if (discountType === "FIXED") {
    return Math.max(0, price - discountValue);
  }

  return price;
}
