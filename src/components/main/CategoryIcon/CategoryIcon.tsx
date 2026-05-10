import styles from "./CategoryIcon.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@prisma/client";

interface Props {
  categories: Category[];
}

export default function CategoryIconComponent({ categories }: Props) {
  return (
    <section className={`${styles.inner} ${styles.icon}`}>
      <header className={styles.title}>
        <h2>카테고리</h2>
      </header>

      <nav>
        <ul>
          {categories.map((cat: Category) => (
            <li key={cat.id}>
              <Link href={`/products/${cat.slug}`} prefetch={false}>
                <figure className={styles.circle}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={cat.imageUrl ?? "/images/no-image.png"}
                      alt={cat.name}
                      fill
                    />
                  </div>
                </figure>
                <p>{cat.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
