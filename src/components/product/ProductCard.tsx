"use client";
import { ShoppingBasket } from "lucide-react";
import styles from "./page.module.scss";
import { Product } from "@/types/types";

interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = () => {
    // 여기에 장바구니 추가 로직
  };

  return (
    <li>
      <figure className={styles.imageWrapper}>
        <img src={product.thumbnail || "/no-image.png"} alt={product.name} />
        <div className={styles.cartIcon} onClick={handleAddToCart}>
          <ShoppingBasket size={20} color="#333" strokeWidth={1.5} />
        </div>
      </figure>

      <div>
        <p>{product.name}</p>
        <strong>{product?.options?.[0]?.price?.toLocaleString()} 원</strong>
      </div>
    </li>
  );
}
