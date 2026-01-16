import { getCategories } from "@/lib/category";
import styles from "./page.module.scss";
import Link from "next/link";

export type MainCategory = {
  id: number;
  created_at: string;
  name: string;
  mainSlug: string;
  sort_order: number;
};

export type SubCategory = {
  id: number;
  created_at: string;
  name: string;
  slug: string;
  main_id: number | null;
  sort_order: number;
};

export type GroupedCategory = MainCategory & {
  subs: SubCategory[];
};

type Props = {
  params: {
    mainSlug: string;
    subSlug: string;
  };
};

export default async function Page({ params }: Props) {
  const { mainSlug, subSlug } = params;
  const { grouped } = await getCategories();

  const currentMain: GroupedCategory | undefined = grouped.find(
    (m) => m.mainSlug === mainSlug
  );
  const currentSub: SubCategory | undefined = currentMain?.subs.find(
    (s) => s.slug === subSlug
  );

  return (
    <section className={styles.container}>
      {/* 타이틀 + 브레드크럼 */}
      <div className={styles.top}>
        <div className={styles.header}>
          {/* 타이틀 */}
          <h1 className={styles.title}>{currentMain?.name}</h1>

          {/* 브레드크럼 */}
          <nav className={styles.breadcrumb}>
            <Link href="/">전상품</Link>
            <span>/</span>
            <Link href={`/products/${currentMain?.mainSlug}`}>
              {currentMain?.name}
            </Link>
            {currentSub && (
              <>
                <span>/</span>
                <span>{currentSub.name}</span>
              </>
            )}
          </nav>
        </div>

        {/* 서브카테고리 탭 */}
        <nav className={styles.tabMenuWrapper}>
          <ul className={styles.tabs}>
            {currentMain?.subs.map((sub) => (
              <li
                key={sub.id}
                className={sub.slug === subSlug ? styles.activeTab : styles.tab}
              >
                <Link href={`/products/${mainSlug}/${sub.slug}`}>
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* 상품 리스트 */}
      <div className={styles.productList}>{/* <ProductList /> */}</div>
    </section>
  );
}
