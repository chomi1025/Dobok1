"use client";

import { useEffect, useState } from "react";

import styles from "./ProductSelectModal.module.scss";

import { X, Search } from "lucide-react";

interface ProductSelectModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (product: ProductItem) => void;
}

interface ProductItem {
  id: number;
  name: string;
  thumbnail: string;
}

export default function ProductSelectModal({
  open,
  onClose,
  onSelect,
}: ProductSelectModalProps) {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  //   디바운스
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // 상품 데이터
  useEffect(() => {
    if (!open) return;

    const fetchProducts = async () => {
      try {
        if (page === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const response = await fetch(
          `/api/products?page=${page}&limit=20&search=${debouncedSearch}`,
        );

        const data = await response.json();

        if (page === 1) {
          setProducts(data.products);
        } else {
          setProducts((prev) => [...prev, ...data.products]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);

        setLoadingMore(false);
      }
    };

    fetchProducts();
  }, [open, page, debouncedSearch]);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <h2>상품 선택</h2>

            <p>견적을 원하는 상품을 선택해주세요.</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.searchBox}>
          <Search size={18} />

          <input
            type="text"
            placeholder="상품명을 검색해주세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.productList}>
          {loading ? (
            <p>상품 불러오는 중...</p>
          ) : (
            products.map((product) => (
              <button
                key={product.id}
                type="button"
                className={styles.productCard}
                onClick={() => onSelect(product)}
              >
                <img src={product.thumbnail} alt={product.name} />

                <div className={styles.info}>
                  <strong>{product.name}</strong>
                </div>
              </button>
            ))
          )}
        </div>

        <button
          type="button"
          className={styles.loadMoreButton}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loadingMore}
        >
          {loadingMore ? "불러오는 중..." : "더보기"}
        </button>
      </div>
    </div>
  );
}
