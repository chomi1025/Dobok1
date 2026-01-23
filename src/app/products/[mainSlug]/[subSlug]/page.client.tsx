"use client";

import Link from "next/link";
import * as P from "./style";
import { Session } from "next-auth";

export type Category = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  sortOrder: number | null;
  children: Category[];
};

type Props = {
  grouped: Category[];
  mainSlug: string;
  subSlug: string;
};

export default function PageClient({ grouped, mainSlug, subSlug }: Props) {
  const currentMain = grouped.find((m) => m.slug === mainSlug);
  const currentSub = currentMain?.children.find((s) => s.slug === subSlug);

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

        <P.TabMenuWrapper>
          <ul>
            {currentMain?.children.map((sub) => (
              <li
                key={sub.id}
                className={sub.slug === subSlug ? "activeTab" : ""}
              >
                <Link href={`/products/${mainSlug}/${sub.slug}`}>
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </P.TabMenuWrapper>
      </P.Top>

      <P.ProductList>{/* <ProductList /> */}</P.ProductList>
    </P.Container>
  );
}
