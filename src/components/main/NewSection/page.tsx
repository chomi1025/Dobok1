import { ProductWithCategory, Title } from "@/types/types";
import ProductSectionComponent from "../ProductSection/page";
import { CategoryBase } from "@/lib/category";

const title: Title = {
  name: "신제품",
  contents: "도복일번지에서 새롭게 출시한 제품을 만나보세요",
  button: "신제품 더보기",
  href: "/new",
};

interface Props {
  categories: CategoryBase[];
  newProducts: ProductWithCategory[];
}

export default async function NewSectionComponent({
  categories,
  newProducts,
}: Props) {
  return (
    <>
      <ProductSectionComponent
        type={"new"}
        categories={categories}
        title={title}
        products={newProducts}
      />
    </>
  );
}
