import { Session } from "next-auth";
import styles from "./page.module.scss";
import ProductCard from "./ProductCard";
import { ProductWithCategory } from "@/types/types";

interface ProductListProps {
  products: ProductWithCategory[];
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
