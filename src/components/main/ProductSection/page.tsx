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
  const products = dbProducts.map((p) => ({
    id: p.id,
    name: p.name,
    categoryId: p.categoryId,
    price: p.options?.[0]?.price ?? 0,
    discount: 0,
    img: p.thumbnail ?? "/no-image.png",
    thumbnail: p.thumbnail ?? "/no-image.png",
    options: p.options ?? [],
    category: p.categoryId,
    isBest: p.isBest,
    isNew: p.isNew ?? false,
    tag: "",
  }));

  return (
    <ProductSectionClientComponent
      categories={categories}
      title={title}
      products={products}
    />
  );
}
