import styles from "./page.module.scss";
import CategoryIconComponent from "@/components/main/CategoryIcon/CategoryIcon";
import Carousel from "../components/main/Carousel/Carousel";
import BestSectionComponent from "@/components/main/BestSection/page";
import Image from "next/image";
import ScrollAnimation from "./../components/common/ScrollAnimation";
import { Metadata } from "next";
import { getMainCategories } from "@/lib/category";
import { prisma } from "@/lib/prisma";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "도복일번지",
  description: "스포츠용품,도복 전문 도복일번지 입니다!",
};

export const revalidate = 3600;

const InstagramComponent = dynamic(
  () => import("@/components/main/Instagram/page"),
  { ssr: false },
);
const NewSectionComponent = dynamic(
  () => import("@/components/main/NewSection/page"),
  { ssr: false },
);

export default async function HomePage() {
  const [mainCategories, bestProducts, newProducts] = await Promise.all([
    getMainCategories(),

    prisma.product.findMany({
      where: { isBest: true },
      take: 8,
      select: {
        id: true,
        name: true,
        thumbnail: true,
        options: {
          select: {
            id: true,
            price: true,
          },
        },
      },
    }),

    prisma.product.findMany({
      where: { isNew: true },
      take: 8,
      select: {
        id: true,
        name: true,
        thumbnail: true,
        options: {
          select: {
            id: true,
            price: true,
          },
        },
      },
    }),
  ]);
  console.log(bestProducts);

  return (
    <div className={styles.main}>
      <Carousel />

      <ScrollAnimation>
        <CategoryIconComponent mainCategory={mainCategories} />
      </ScrollAnimation>

      <hr className={styles.line} />

      {/* 베스트상품 */}
      <ScrollAnimation>
        <BestSectionComponent
          categories={mainCategories}
          bestProducts={bestProducts}
        />
      </ScrollAnimation>

      {/* 메인배너 */}
      <ScrollAnimation>
        <div className={styles.banner}>
          <Image src={"/no.png"} alt={"이벤트 배너"} fill />

          <p
            style={{
              position: "relative",
              textAlign: "center",
              fontSize: "28px",
              zIndex: 1,
            }}
          >
            이벤트배너 자리
          </p>
        </div>
      </ScrollAnimation>

      {/* 신제품  */}
      <ScrollAnimation>
        <NewSectionComponent
          categories={mainCategories}
          newProducts={newProducts}
        />
      </ScrollAnimation>

      <hr className={styles.line} />

      <ScrollAnimation>
        <section className={styles.banner2}>
          <div>
            <Image src={"/no.png"} alt={"이벤트 배너"} fill />
          </div>

          <div>
            <Image src={"/no.png"} alt={"이벤트 배너"} fill />
          </div>
        </section>
      </ScrollAnimation>

      <hr className={styles.line} />

      <ScrollAnimation>
        <InstagramComponent />
      </ScrollAnimation>
    </div>
  );
}
