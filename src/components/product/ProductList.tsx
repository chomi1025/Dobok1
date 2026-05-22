import styles from "./page.module.scss";
import ProductCard from "./ProductCard";
import { ProductPreview } from "@/types/types";

interface ProductListProps {
  products: ProductPreview[];
  className?: string;
}

export default function ProductList({ products, className }: ProductListProps) {
  return (
    <>
      <ul className={`${styles.productList} ${className || ""}`}>
        {products.map((prd) => (
          <ProductCard key={prd.id} product={prd} />
        ))}
      </ul>
    </>
  );
}
