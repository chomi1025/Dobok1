import { prisma } from "@/lib/prisma";
import { ProductWithCategory } from "../../../types/types";
import { Session } from "next-auth";
import ProductSectionComponent from "../ProductSection/page";
import { Category } from "@/lib/category";

interface Props {
  session: Session | null;
  categories: Category[];
}

const title = {
  name: "신제품",
  contents: "도복일번지에서 새롭게 출시한 제품을 만나보세요",
  button: "신제품 더보기",
  href: "/new",
};

export default async function NewSectionComponent({
  session,
  categories,
}: Props) {
  const dbProducts: ProductWithCategory[] = await prisma.product.findMany({
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
        session={session}
        categories={categories}
        title={title}
        products={dbProducts}
      />
    </>
  );
}
