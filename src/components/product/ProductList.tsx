import { Session } from "next-auth";
import styles from "./page.module.scss";
import ProductCard from "./ProductCard";
import { Product } from "@/types/types";

interface ProductListProps {
  session: Session | null;
  products: Product[];
  className?: string;
}

export default function ProductList({
  session,
  products,
  className,
}: ProductListProps) {
  console.log(products);
  return (
    <>
      <ul className={`${styles.productList} ${className || ""}`}>
        {products.map((prd) => (
          <ProductCard session={session} product={prd} />
        ))}
      </ul>
    </>
  );
}
