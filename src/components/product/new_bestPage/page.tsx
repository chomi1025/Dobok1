import styles from "./page.module.scss";
import ProductList from "@/components/product/ProductList";
import { ProductWithCategory } from "@/types/types";

interface Props {
  title: {
    name: string;
    contents: string;
  };
  products: ProductWithCategory[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
}

export default function ProductPageComponent({ title, products }: Props) {
  return (
    <section className={styles.inner}>
      <div className={styles.title}>
        <h2>{title.name}</h2>
        <p>{title.contents}</p>
      </div>

      <hr />

      <div>
        <ProductList products={products} />
      </div>
    </section>
  );
}
