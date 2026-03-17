"use client";

import Link from "next/link";
import * as P from "./style";
import { Session } from "next-auth";
import CategoryTabs from "@/components/CategoryTabs/page";
import { useRouter } from "next/navigation";

export type Category = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  sortOrder: number | null;
  children?: Category[];
};

type Props = {
  grouped: Category[];
  mainSlug: string;
  subSlug: string;
};

export default function PageClient({ grouped, mainSlug, subSlug }: Props) {
  const router = useRouter();

  const currentMain = grouped.find((m) => m.slug === mainSlug);

  const tabCategories = currentMain?.children || [];

  const currentSub = tabCategories.find((s) => s.slug === subSlug);
  const activeTabId = currentSub ? currentSub.id : "all";

  const handleTabChange = (id: number | string) => {
    if (id === "all") {
      router.push(`/products/${mainSlug}`);
    } else {
      const targetSub = tabCategories.find((cat) => cat.id === id);
      if (targetSub) {
        router.push(`/products/${mainSlug}/${targetSub.slug}`);
      }
    }
  };

  return (
    <P.Container>
      <P.Top>
        <P.Header>
          <P.Title>{currentMain?.name}</P.Title>

          <P.Breadcrumb>
            <Link href="/">전상품</Link>

            <span>&gt;</span>

            <Link href={`/products/${currentMain?.slug}`}>
              {currentMain?.name}
            </Link>
            {currentSub && (
              <>
                <span className="withSeparator" />
                <span>{currentSub.name}</span>
              </>
            )}
          </P.Breadcrumb>
        </P.Header>

        {/* 탭메뉴 */}
        <CategoryTabs
          categories={tabCategories}
          activeTab={activeTabId}
          onTabChange={handleTabChange}
        />
      </P.Top>

      <P.ProductList>{/* <ProductList /> */}</P.ProductList>
    </P.Container>
  );
}
