import styles from "./page.module.scss";
import ProductList from "@/components/product/ProductList";
import { Product } from "@/types/types";
import { Session } from "next-auth";

interface ProductPageProps {
  session: Session | null;
  title: {
    name: string;
    contents: string;
  };
  products: Product[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
}

export default function ProductPageComponent({
  session,
  title,
  products,
  totalItems,
  currentPage,
  pageSize,
}: ProductPageProps) {
  return (
    <section className={styles.inner}>
      <div className={styles.title}>
        <h2>{title.name}</h2>
        <p>{title.contents}</p>
      </div>
      <hr />

      <div>
        <ProductList session={session} products={products} />
      </div>
    </section>
  );
}
