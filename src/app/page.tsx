import styles from "./page.module.scss";
import CategoryIconComponent from "@/components/main/CategoryIcon/CategoryIcon";
import Carousel from "../components/main/Carousel/Carousel";
import BestSectionComponent from "@/components/main/BestSection/page";
import NewSectionComponent from "@/components/main/NewSection/page";
import Image from "next/image";
import InstagramComponent from "@/components/main/Instagram/page";
import ScrollAnimation from "./../components/common/ScrollAnimation";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    where: {
      parentId: null,
    },
    include: {
      children: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  return (
    <main className={styles.main}>
      {/* 캐러샐 슬라이드 */}
      <Carousel />

      {/* 카테고리 아이콘 */}
      <ScrollAnimation>
        <CategoryIconComponent />
      </ScrollAnimation>

      {/* 구분선 */}
      <hr className={styles.line} />

      {/* 베스트상품 */}
      <ScrollAnimation>
        <BestSectionComponent categories={categories} />
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
        <NewSectionComponent categories={categories} />
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
