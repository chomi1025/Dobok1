import { prisma } from "@/lib/prisma";

import { Category, Title } from "../../../types/types";
import { Session } from "next-auth";
import ProductSectionComponent from "../ProductSection/page";

const title: Title = {
  name: "베스트 상품",
  contents: "도복일번지의 베스트 상품을 모아왔어요",
  button: "베스트 더보기",
  href: "/best",
};

interface Props {
  session: Session | null;
  categories: Category[];
}

export default async function BestSectionComponent({
  session,
  categories,
}: Props) {
  return (
    <>
      <ProductSectionComponent
        session={session}
        categories={categories}
        title={title}
        bestProducts={bestProducts}
      />
    </>
  );
}
