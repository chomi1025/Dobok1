"use client";
import { createPortal } from "react-dom";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import styles from "./QuickAddModal.module.scss";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { addToCart } from "./../hooks/useCart";
import { ProductWithCategory } from "@/types/types";

interface Props {
  product: ProductWithCategory;
  user: any;
  onClose: () => void;
}

export default function QuickAddModal({ product, user, onClose }: Props) {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const getOptionDisplay = (opt: any) => {
    const parts = [];
    if (opt.color) parts.push(opt.color);
    if (opt.size) parts.push(opt.size);
    return parts.join(" / ") || "기본 옵션";
  };

  // 리스트에 추가
  const handleOptionClick = (opt: any) => {
    const isExist = selectedItems.find(
      (item) => item.productOptionId === opt.id,
    );
    if (isExist) {
      return toast("이미 선택된 옵션입니다. 수량을 조절해주세요.");
    }

    setSelectedItems([
      ...selectedItems,
      {
        productId: product.id,
        productOptionId: opt.id,
        productName: product.name,
        thumbnail: product.thumbnail,
        optionDisplay: getOptionDisplay(opt),
        price: opt.price,
        quantity: 1,
        isCustomizable: product.isCustomizable,
      },
    ]);
  };

  // 수량
  const updateQuantity = (id: number, delta: number) => {
    setSelectedItems((items) =>
      items.map((item) =>
        item.productOptionId === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  // 리스트에서 삭제
  const removeItem = (id: number) => {
    setSelectedItems((items) =>
      items.filter((item) => item.productOptionId !== id),
    );
  };

  // 총 합계
  const totalPrice = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // 모든 아이템 장바구니
  const handleAllAddToCart = async () => {
    if (selectedItems.length === 0)
      return toast.error("옵션을 먼저 선택해주세요.");

    try {
      const promises = selectedItems.map((item) => addToCart(item, user));
      const results = await Promise.all(promises);

      if (results.every((res) => res)) {
        toast.success("담기 성공!");
        onClose();
      } else {
        toast.error("일부 상품 담기에 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      toast.error("장바구니 담기 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    window.addEventListener("keydown", handleEsc);

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [onClose]);

  const modalContent = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h2>옵션 선택</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={24} color="#111" />
          </button>
        </header>

        <section className={styles.productInfo}>
          <img src={product.thumbnail || "/no-image.png"} alt={product.name} />
          <div className={styles.infoText}>
            <p className={styles.name}>{product.name}</p>
            <p className={styles.price}>
              {product.options?.[0]?.price.toLocaleString()}원 ~
            </p>
          </div>
        </section>

        <section className={styles.optionsArea}>
          <h3>사이즈 및 컬러 선택</h3>
          <div className={styles.chipContainer}>
            {product.options?.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={styles.optionChip}
                onClick={() => handleOptionClick(opt)}
              >
                <span className={styles.optLabel}>{getOptionDisplay(opt)}</span>
                <span className={styles.optPrice}>
                  {opt.price.toLocaleString()}원
                </span>
              </button>
            ))}
          </div>
        </section>

        {selectedItems.length > 0 && (
          <section className={styles.selectedList}>
            {selectedItems.map((item) => (
              <div key={item.productOptionId} className={styles.selectedItem}>
                <div className={styles.itemInfo}>
                  <p className={styles.optTitle}>{item.optionDisplay}</p>
                  <div className={styles.qtyControl}>
                    <button
                      onClick={() => updateQuantity(item.productOptionId, -1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productOptionId, 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className={styles.itemRight}>
                  <strong>
                    {(item.price * item.quantity).toLocaleString()}원
                  </strong>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.productOptionId)}
                  >
                    <Trash2 size={16} color="#999" />
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        <div className={styles.totalArea}>
          <div className={styles.totalRow}>
            <span>총 합계 금액</span>
            <strong>{totalPrice.toLocaleString()}원</strong>
          </div>
        </div>

        <footer className={styles.footer}>
          <button className={styles.submitBtn} onClick={handleAllAddToCart}>
            {selectedItems.length > 0
              ? `${selectedItems.length}개의 상품 담기`
              : "옵션을 선택해주세요"}
          </button>
        </footer>
      </div>
    </div>
  );
  return createPortal(modalContent, document.body);
}
