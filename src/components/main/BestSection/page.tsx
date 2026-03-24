import { prisma } from "@/lib/prisma";
import ProductSectionComponent from "../ProductSection/page";
import { Category, Product, Title } from "../../../types/types";
import { Session } from "next-auth";

const title: Title = {
  name: "베스트 상품",
  contents: "도복일번지의 베스트 상품을 모아왔어요",
  button: "베스트 더보기",
};

interface Props {
  session: Session | null;
  categories: Category[];
}

export default async function BestSectionComponent({
  session,
  categories,
}: Props) {
  const dbProducts: Product[] = await prisma.product.findMany({
    where: { isBest: true },
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
        session={session}
        categories={categories}
        title={title}
        dbProducts={dbProducts}
      />
    </>
  );
}
