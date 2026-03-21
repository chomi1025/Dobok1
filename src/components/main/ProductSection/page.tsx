import ProductSectionClientComponent from "./page.client";
import { Category, Product, Title } from "../../../types/types";

export interface ProductSectionProps {
  categories: Category[];
  dbProducts: any[];
  title: Title;
}

export interface ProductClientProps {
  categories: Category[];
  products: Product[];
  title: Title;
}

export default async function ProductSectionComponent({
  categories,
  title,
  dbProducts,
}: ProductSectionProps) {
  return (
    <ProductSectionClientComponent
      categories={categories}
      title={title}
      products={dbProducts}
    />
  );
}
