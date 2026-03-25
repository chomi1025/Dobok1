import { Session } from "next-auth";
import styles from "./page.module.scss";
import ProductCard from "./ProductCard";
import { Prisma } from "@prisma/client";
import { ProductWithCategory } from "@/types/types";

interface ProductListProps {
  session: Session | null;
  products: ProductWithCategory[];
  className?: string;
}

export default function ProductList({
  session,
  products,
  className,
}: ProductListProps) {
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
