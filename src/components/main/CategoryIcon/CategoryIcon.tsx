import { prisma } from "@/lib/prisma";
import styles from "./CategoryIcon.module.scss";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryIconComponent() {
  const mainCategory = await prisma.category.findMany({
    where: {
      parentId: null,
    },
    orderBy: {
      id: "asc",
    },
  });
  console.log(mainCategory);

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
                    <Image src={cat.imageUrl || null} alt={cat.name} fill />
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
