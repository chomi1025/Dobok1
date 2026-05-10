import { Title } from "@/types/types";
import ProductSectionComponent from "../ProductSection/page";
import { Category } from "@prisma/client";

interface Props {
  categories: Category[];
}

const title: Title = {
  name: "신제품",
  contents: "도복일번지에서 새롭게 출시한 제품을 만나보세요",
  button: "신제품 더보기",
  href: "/products/new",
};

export default async function NewSectionComponent({ categories }: Props) {
  return (
    <>
      <ProductSectionComponent
        type={"new"}
        title={title}
        categories={categories}
      />
    </>
  );
}
