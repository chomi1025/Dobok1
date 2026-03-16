import Link from "next/link";
import styles from "./Header.module.scss";

interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  sortOrder: number | null;
  children?: Category[];
}

interface HeaderDropdownProps {
  categories: Category[];
}

export default function HeaderDropdown({ categories }: HeaderDropdownProps) {
  return (
    <>
      {categories.map((cat) => (
        <ul key={cat.id}>
          <li className={styles.bCategory}>{cat.name}</li>

          <div className={styles.line} />
          {cat.children?.map((el) => (
            <li key={el.id} className={styles.sCategory}>
              <Link href={`/products/${cat.slug}/${el.slug}`}>{el.name}</Link>
            </li>
          ))}
        </ul>
      ))}
    </>
  );
}
