"use client";
import styles from "./page.module.scss";
import CategoryIconComponent from "@/components/main/CategoryIcon/CategoryIcon";
import Carousel from "../components/main/Carousel/Carousel";
import BestSectionComponent from "@/components/main/BestSection/page";
import ScrollAnimation from "./../components/common/ScrollAnimation";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import ProductSectionComponent from "@/components/main/ProductSection/page";
import {
  fetchBestProducts,
  fetchMainCategories,
  fetchNewProducts,
} from "@/lib/api";

const InstagramComponent = dynamic(
  () => import("@/components/main/Instagram/page"),
  { ssr: false },
);

const NewSectionComponent = dynamic(
  () => import("@/components/main/NewSection/page"),
  { ssr: false },
);

export default function HomeClientPage() {
  const { data: mainCategories } = useQuery({
    queryKey: ["mainCategories"],
    queryFn: fetchMainCategories,
    staleTime: 1000 * 60 * 5,
  });

  const { data: bestProducts } = useQuery({
    queryKey: ["bestProducts"],
    queryFn: fetchBestProducts,
    staleTime: 1000 * 60 * 5,
  });

  const { data: newProducts } = useQuery({
    queryKey: ["newProducts"],
    queryFn: fetchNewProducts,
    staleTime: 1000 * 60 * 5,
  });

  const categories = mainCategories || [];
  const best = bestProducts || [];
  const newItems = newProducts || [];

  return (
    <div className={styles.main}>
      <Carousel />

      <ScrollAnimation>
        <CategoryIconComponent mainCategory={categories} />
      </ScrollAnimation>

      <hr className={styles.line} />

      {/* 베스트상품 */}
      <ScrollAnimation>
        <BestSectionComponent categories={categories} bestProducts={best} />
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
        <NewSectionComponent categories={categories} newProducts={newItems} />
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
