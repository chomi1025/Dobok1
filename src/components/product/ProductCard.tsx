"use client";
import { ShoppingBasket } from "lucide-react";
import styles from "./page.module.scss";
import { Product } from "@/types/types";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("장바구니 담기:", product.id);
  };
  console.log(product);
  return (
    <li>
      <Link href={`/product/${product.id}`} className={styles.linkWrapper}>
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
      </Link>
    </li>
  );
}
