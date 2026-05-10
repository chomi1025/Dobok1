"use client";
import { ShoppingBasket } from "lucide-react";
import styles from "./page.module.scss";
import Link from "next/link";
import toast from "react-hot-toast";
import { addToCart } from "../hooks/useCart";
import { useState } from "react";
import QuickAddModal from "../cart/QuickAddModal";
import { ProductWithCategory } from "@/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface ProductCardProps {
  product: ProductWithCategory;
}

const getDiscountedPrice = (price: number, type: string, value: number) => {
  if (type === "PERCENTAGE") {
    return price * (1 - value / 100);
  }
  if (type === "FIXED") {
    return Math.max(0, price - value);
  }
  return price;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const hasOptions = product.options && product.options.length > 1;

    if (hasOptions) {
      setIsModalOpen(true);
      return;
    }

    const targetOption = product.options?.[0];
    if (!targetOption) return toast.error("상품 정보를 불러올 수 없습니다.");

    const itemData = {
      productId: product.id,
      productOptionId: targetOption.id,
      productName: product.name,
      thumbnail: product.thumbnail,
      quantity: 1,
    };

    const success = await addToCart(itemData, session?.user);

    if (success) {
      toast.success("상품이 장바구니에 담겼습니다.", { duration: 3000 });
    } else {
      toast.error("장바구니 담기에 실패했습니다.");
    }
  };

  const baseOption = product.options?.[0];
  const originalPrice = baseOption?.price || 0;

  const isDiscounted =
    product.discountValue !== null && (product.discountValue ?? 0) > 0;

  const discountedPrice = isDiscounted
    ? getDiscountedPrice(
        originalPrice,
        product.discountType || "PERCENTAGE",
        product.discountValue || 0,
      )
    : originalPrice;

  const discountRate = isDiscounted
    ? product.discountType === "PERCENTAGE"
      ? product.discountValue
      : Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
    : 0;

  return (
    <li>
      <Link
        href={`/product/${product.id}`}
        className={styles.linkWrapper}
        prefetch={false}
      >
        <figure className={styles.imageWrapper}>
          <Image
            src={product.thumbnail || "/no-image.png"}
            className={styles.thumbnail}
            alt={product.name}
            sizes="(max-width: 768px) 50vw, 25vw"
            fill
          />

          <div className={styles.cartIcon} onClick={handleAddToCart}>
            <ShoppingBasket size={20} color="#333" strokeWidth={1.5} />
          </div>
        </figure>

        <div>
          <p>{product.name}</p>

          {/* 가격 */}
          <div className={styles.priceContainer}>
            {isDiscounted ? (
              <div className={styles.discountRow}>
                <span className={styles.discountRate}>{discountRate}%</span>
                <strong className={styles.finalPrice}>
                  {discountedPrice.toLocaleString()}원
                </strong>
                <span className={styles.originalPrice}>
                  {originalPrice.toLocaleString()}원
                </span>
              </div>
            ) : (
              <strong className={styles.finalPrice}>
                {originalPrice.toLocaleString()}원
              </strong>
            )}
          </div>

          {/* 뱃지 */}
          <div className={styles.badgeContainer}>
            {product.isNew && (
              <span className={`${styles.badge} ${styles.new}`}>NEW</span>
            )}
            {product.isBest && (
              <span className={`${styles.badge} ${styles.best}`}>BEST</span>
            )}
            {product.isRecommended && (
              <span className={`${styles.badge} ${styles.recommend}`}>
                추천
              </span>
            )}
            {isDiscounted && (
              <span className={`${styles.badge} ${styles.sale}`}>SALE</span>
            )}
          </div>
        </div>
      </Link>

      {isModalOpen && (
        <QuickAddModal
          product={product}
          user={session?.user}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </li>
  );
}
