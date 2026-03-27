import styles from "./page.module.scss";
import CategoryIconComponent from "@/components/main/CategoryIcon/CategoryIcon";
import Carousel from "../components/main/Carousel/Carousel";
import BestSectionComponent from "@/components/main/BestSection/page";
import NewSectionComponent from "@/components/main/NewSection/page";
import Image from "next/image";
import InstagramComponent from "@/components/main/Instagram/page";
import ScrollAnimation from "./../components/common/ScrollAnimation";
import { Metadata } from "next";
import { getMainCategories } from "@/lib/category";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "도복일번지",
  description: "스포츠용품,도복 전문 도복일번지 입니다!",
};

export const revalidate = 3600;

export default async function HomePage() {
  const [mainCategories, bestProducts, newProducts] = await Promise.all([
    getMainCategories(),
    prisma.product.findMany({
      where: { isBest: true },
      take: 8,
      include: { options: true, category: { include: { parent: true } } },
    }),
    prisma.product.findMany({
      where: { isNew: true },
      take: 8,
      include: { options: true, category: { include: { parent: true } } },
    }),
  ]);

  return (
    <main className={styles.main}>
      {/* 캐러샐 슬라이드 */}
      <Carousel />

      {/* 카테고리 아이콘 */}
      <ScrollAnimation>
        <CategoryIconComponent mainCategory={mainCategories} />
      </ScrollAnimation>

      {/* 구분선 */}
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

      {/* 신제품 */}
      <ScrollAnimation>
        <NewSectionComponent
          categories={mainCategories}
          newProducts={newProducts}
        />
      </ScrollAnimation>

      {/* 구분선 */}
      <hr className={styles.line} />

      {/* 배너 2단 */}
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

      {/* 인스타그램 */}
      <ScrollAnimation>
        <InstagramComponent />
      </ScrollAnimation>
    </main>
  );
}
