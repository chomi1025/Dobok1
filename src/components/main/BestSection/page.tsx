import { Category, Product } from "@prisma/client";
import { Title } from "../../../types/types";
import ProductSectionComponent from "../ProductSection/page";

interface Props {
  categories: Category[];
  initialProducts: Product[];
}

const title: Title = {
  name: "베스트 상품",
  contents: "도복일번지의 베스트 상품을 모아왔어요",
  button: "베스트 더보기",
  href: "products/best",
};

export default async function BestSectionComponent({
  categories,
  initialProducts,
}: Props) {
  return (
    <>
      <ProductSectionComponent
        type={"best"}
        title={title}
        categories={categories}
        initialProducts={initialProducts}
      />
    </>
  );
}
