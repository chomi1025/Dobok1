import { prisma } from "@/lib/prisma";
import ProductSectionComponent from "../ProductSection/page";
import { Category } from "../../../types/types";

interface Props {
  categories: Category[];
}

const title = {
  name: "신제품",
  contents: "도복일번지에서 새롭게 출시한 제품을 만나보세요",
  button: "신제품 더보기",
};

export default async function NewSectionComponent({ categories }: Props) {
  const productsPromise = categories.map((cat) =>
    prisma.product.findMany({
      where: { isNew: true, categoryId: cat.id },
      take: 8,
      include: { options: true },
    }),
  );

  const allProductsPromise = prisma.product.findMany({
    where: { isNew: true },
    take: 8,
    include: { options: true },
  });

  const results = await Promise.all([...productsPromise, allProductsPromise]);
  const allFetchedProducts = results.flat();

  return (
    <>
      <ProductSectionComponent
        categories={categories}
        title={title}
        dbProducts={allFetchedProducts}
      />
    </>
  );
}
