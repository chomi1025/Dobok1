import { prisma } from "@/lib/prisma";
import ProductSectionComponent from "../ProductSection/page";
import { Category, Product } from "../../../types/types";

interface Props {
  categories: Category[];
}

const title = {
  name: "신제품",
  contents: "도복일번지에서 새롭게 출시한 제품을 만나보세요",
  button: "신제품 더보기",
};

export default async function NewSectionComponent({ categories }: Props) {
  const dbProducts: Product[] = await prisma.product.findMany({
    where: { isNew: true },
    take: 40,
    include: {
      options: true,
      category: {
        include: {
          parent: true,
        },
      },
    },
  });

  return (
    <>
      <ProductSectionComponent
        categories={categories}
        title={title}
        dbProducts={dbProducts}
      />
    </>
  );
}
