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

interface ProductCardProps {
  product: ProductWithCategory;
}

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
      price: targetOption.price,
      isCustomizable: product.isCustomizable,
      quantity: 1,
    };

    const success = await addToCart(itemData, session?.user);

    if (success) {
      toast.success("상품이 장바구니에 담겼습니다.", { duration: 3000 });
    } else {
      toast.error("장바구니 담기에 실패했습니다.");
    }
  };

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
