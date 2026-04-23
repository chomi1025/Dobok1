"use client";
import Link from "next/link";
import styles from "./Header.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getMainCategories } from "@/lib/category";

interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  sortOrder: number | null;
  children?: Category[];
}

export default function HeaderDropdown() {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => fetch("/api/categories").then((res) => res.json()),
  });

  return (
    <>
      {categories.map((cat) => (
        <ul key={cat.id}>
          <li className={styles.bCategory}>
            <Link href={`/products/${cat.slug}`} prefetch={false}>
              {cat.name}
            </Link>
          </li>

          <div className={styles.line} />
          {cat.children?.map((el) => (
            <li key={el.id} className={styles.sCategory}>
              <Link href={`/products/${cat.slug}/${el.slug}`} prefetch={false}>
                {el.name}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </>
  );
}
