import { prisma } from "@/lib/prisma";
import { Title } from "../../../types/types";
import ProductSectionComponent from "../ProductSection/page";
import { CategoryBase } from "@/lib/category";

const title: Title = {
  name: "베스트 상품",
  contents: "도복일번지의 베스트 상품을 모아왔어요",
  button: "베스트 더보기",
  href: "/best",
};

interface Props {
  categories: CategoryBase[];
}

export default async function BestSectionComponent({ categories }: Props) {
  const initialProducts = await prisma.product.findMany({
    where: { isBest: true },
    take: 8,
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
        type={"best"}
        categories={categories}
        title={title}
        products={initialProducts}
      />
    </>
  );
}
