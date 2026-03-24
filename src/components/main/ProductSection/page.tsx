import ProductSectionClientComponent from "./page.client";
import { Category, Product, Title } from "../../../types/types";
import { Session } from "next-auth";

export interface ProductSectionProps {
  session: Session | null;
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
  session,
  categories,
  title,
  dbProducts,
}: ProductSectionProps) {
  return (
    <ProductSectionClientComponent
      session={session}
      categories={categories}
      title={title}
      products={dbProducts}
    />
  );
}
