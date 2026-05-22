import { Metadata } from "next";
import styles from "./page.module.scss";
import { fetchMainCategories, fetchProductPreview } from "@/lib/api";
import ScrollAnimation from "@/components/common/ScrollAnimation";
import CategoryIconComponent from "@/components/main/CategoryIcon/CategoryIcon";
import BestSectionComponent from "@/components/main/BestSection/page";
import { MessageSquare, Settings, Trophy, Users } from "lucide-react";
import Link from "next/link";
import NewSectionComponent from "@/components/main/NewSection/page";
import InstagramComponent from "@/components/main/Instagram/page";
import Carousel from "@/components/main/Carousel/Carousel";

export const metadata: Metadata = {
  title: "도복일번지",
  description: "스포츠용품,도복 전문 도복일번지 입니다!",
};

export const revalidate = 60;

export default async function HomePage() {
  const [categories, bestProducts, newProducts] = await Promise.all([
    fetchMainCategories(),
    fetchProductPreview("best"),
    fetchProductPreview("new"),
  ]);

  return (
    <div className={styles.main}>
      <Carousel />

      <ScrollAnimation>
        <CategoryIconComponent categories={categories} />
      </ScrollAnimation>

      <hr />

      <ScrollAnimation>
        <BestSectionComponent
          categories={categories}
          initialProducts={bestProducts}
        />
      </ScrollAnimation>

      <section className={styles.communitySection}>
        <div className={styles.header}>
          <h2>커뮤니티</h2>
          <a href="/community">전체보기 →</a>
        </div>

        <ul className={styles.grid}>
          <li>
            <Link href="/community/jobs" prefetch={false}>
              <div className={styles.iconWrapper}>
                <Users size={24} />
              </div>
              <h4>구인구직</h4>
              <p>도장 채용 / 취업 정보</p>
            </Link>
          </li>

          <li>
            <Link href="/community/free" prefetch={false}>
              <div className={styles.iconWrapper}>
                <MessageSquare size={24} />
              </div>
              <h4>자유게시판</h4>
              <p>자유롭게 소통하세요</p>
            </Link>
          </li>

          <li>
            <Link href="/community/events" prefetch={false}>
              <div className={styles.iconWrapper}>
                <Trophy size={24} />
              </div>
              <h4>대회·행사</h4>
              <p>최신 대회 정보</p>
            </Link>
          </li>

          <li>
            <Link href="/community/resources" prefetch={false}>
              <div className={styles.iconWrapper}>
                <Settings size={24} />
              </div>
              <h4>도장 운영자료</h4>
              <p>운영 노하우 공유</p>
            </Link>
          </li>
        </ul>
      </section>

      <section className={styles.banner}>
        <div className={styles.textArea}>
          <span className={styles.tag}>EVENT</span>
          <h3>단체복 30% 할인</h3>
          <p>지금 바로 인기 상품을 만나보세요</p>
          <button>자세히 보기 →</button>
        </div>
      </section>

      <ScrollAnimation>
        <NewSectionComponent
          categories={categories}
          initialProducts={newProducts}
        />
      </ScrollAnimation>

      <hr />

      <div className={styles.instagramSection}>
        <ScrollAnimation>
          <div className={styles.sectionHeader}>
            <h2 className={styles.instaTitle}>@OUR_INSTAGRAM</h2>
            <p className={styles.instaSubtitle}>
              일상 속에서 만나는 우리들의 이야기
            </p>
          </div>

          <InstagramComponent />
        </ScrollAnimation>
      </div>
    </div>
  );
}
