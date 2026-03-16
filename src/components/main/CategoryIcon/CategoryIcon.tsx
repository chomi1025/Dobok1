import { prisma } from "@/lib/prisma";
import styles from "./CategoryIcon.module.scss";
import Image from "next/image";
import Link from "next/link";

interface MainCategory {
  id: number;
  name: string;
  slug: string;
  imageUrl: string | null;
  parentId?: number | null;
}

export default async function CategoryIconComponent() {
  const mainCategory: MainCategory[] = await prisma.category.findMany({
    where: {
      parentId: null,
    },
    orderBy: {
      id: "asc",
    },
  });

  return (
    <section className={`${styles.inner} ${styles.icon}`}>
      <div className={styles.title}>
        <h2>카테고리</h2>
      </div>

      <nav>
        <ul>
          {mainCategory.map((cat) => (
            <li key={cat.id}>
              <Link href={`/products/${cat.slug}`}>
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
