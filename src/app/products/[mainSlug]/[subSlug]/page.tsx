"use client";
import Link from "next/link";
import * as S from "./style";
import { getMainCategory, getSubCategory } from "@/lib/category";
import { PRODUCTS } from "./../../../../assets/data/product";
import { Line } from "./../../../signup/style";
import Image from "next/image";
import ProductList from "./../../../../components/product/productList";
import { Product } from "./page";

export interface Product {
  id: string;
  name: string;

  mainSlug: string; // protection
  subSlug: string; // headgear

  price: number; // 원가
  saleRate: number; // 할인율 (없으면 0)

  thumbnail: string; // 리스트용 이미지
  images: string[]; // 상세페이지 이미지들

  isSoldOut: boolean;
  createdAt: string;
}

interface SubCategory {
  name: string;
  subSlug: string;
}

interface MainCategory {
  name: string;
  mainSlug: string;
  subMenu: SubCategory[];
}

interface PageProps {
  params: {
    mainSlug: string;
    subSlug?: string; // 전체 페이지 대비
  };
}

export default function SubCategory({ params }: PageProps) {
  const { mainSlug, subSlug } = params;
  const main = getMainCategory(mainSlug) as MainCategory;
  const sub = subSlug
    ? (getSubCategory(mainSlug, subSlug) as SubCategory)
    : null;

  const subTabs: { name: string; subSlug: string | null }[] = [
    { name: "전체", subSlug: null },
    ...main.subMenu,
  ];

  const isActive =
    (sub.subSlug === null && !params.subSlug) || sub.subSlug === params.subSlug;

  return (
    <>
      <S.Inner>
        <S.Title_Wrapper>
          <S.Bread_crumb aria-label="breadcrumb">
            <ol>
              <li>
                <Link href="/">전상품</Link>
              </li>

              <li>
                <Link href="/">{main.name}</Link>
              </li>

              {sub && (
                <li>
                  <Link href={`/products/${main.mainSlug}/${sub.subSlug}`}>
                    {sub.name}
                  </Link>
                </li>
              )}
            </ol>
          </S.Bread_crumb>

          <h2>{main.name}</h2>
        </S.Title_Wrapper>

        <S.TabMenu_Wrapper aria-label="카테고리 탭">
          <ul>
            {subTabs.map((tab) => {
              const isActive =
                (tab.subSlug === null && !params.subSlug) ||
                tab.subSlug === params.subSlug;

              return (
                <li
                  key={tab.subSlug ?? "all"}
                  className={isActive ? "active" : ""}
                >
                  <Link
                    href={
                      tab.subSlug
                        ? `/products/${main.mainSlug}/${tab.subSlug}`
                        : `/products/${main.mainSlug}`
                    }
                  >
                    {tab.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </S.TabMenu_Wrapper>

        <S.Product_Wrapper>
          <select name="" id="">
            <option value="">최신순</option>
            <option value="">가격순</option>
            <option value="">후기순</option>
          </select>
          <ProductList product={PRODUCTS} />
        </S.Product_Wrapper>
      </S.Inner>
    </>
  );
}
