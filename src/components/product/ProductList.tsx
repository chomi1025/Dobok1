import styles from "./page.module.scss";
import ProductCard from "./ProductCard";
import { Product } from "@/types/types";

interface ProductListProps {
  products: Product[];
  className?: string;
}

export default function ProductList({ products, className }: ProductListProps) {
  return (
    <>
      <ul className={`${styles.productList} ${className || ""}`}>
        {products.map((prd) => (
          <ProductCard product={prd} />
        ))}
      </ul>
    </>
  );
}
