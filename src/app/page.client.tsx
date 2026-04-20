"use client";
import styles from "./page.module.scss";
import CategoryIconComponent from "@/components/main/CategoryIcon/CategoryIcon";
import Carousel from "../components/main/Carousel/Carousel";
import BestSectionComponent from "@/components/main/BestSection/page";
import ScrollAnimation from "./../components/common/ScrollAnimation";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { fetchProductPreview, fetchMainCategories } from "@/lib/api";

const InstagramComponent = dynamic(
  () => import("@/components/main/Instagram/page"),
  { ssr: false },
);

const NewSectionComponent = dynamic(
  () => import("@/components/main/NewSection/page"),
  { ssr: false },
);

export default function HomeClientPage() {
  return (
    <div className={styles.main}>
      <Carousel />

      <ScrollAnimation>
        <CategoryIconComponent />
      </ScrollAnimation>

      <hr className={styles.line} />

      {/* 베스트상품 */}
      <ScrollAnimation>
        <BestSectionComponent />
      </ScrollAnimation>

      {/* 메인배너 */}
      <ScrollAnimation>
        <div className={styles.banner}>
          {/* <Image src={"/no.png"} alt={"이벤트 배너"} fill /> */}

          <p>이벤트배너</p>
        </div>
      </ScrollAnimation>

      {/* 신제품  */}
      <ScrollAnimation>
        <NewSectionComponent />
      </ScrollAnimation>

      <hr className={styles.line} />

      <ScrollAnimation>
        <section className={styles.banner2}>
          <div>
            이벤트 배너
            {/* <Image
              src="https://placehold.co/1920x400?text=Banner+Coming+Soon"
              alt={"이벤트 배너"}
              fill
            /> */}
          </div>

          <div>
            이벤트 배너
            {/* <Image
              src="https://placehold.co/1920x400?text=Banner+Coming+Soon"
              alt={"이벤트 배너"}
              fill
            /> */}
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
