"use client";
import styles from "./page.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

export default function InstagramClientComponent() {
  const instaPosts = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className={styles.swiperWrapper}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={15}
        slidesPerView={2}
        grabCursor={true}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 6, spaceBetween: 20 },
        }}
        className={styles.mySwiper}
      >
        {instaPosts.map((post, idx) => (
          <SwiperSlide key={idx} className={styles.slide}>
            <div className={styles.imageBox}>
              {/* 실제 이미지 경로로 수정 필요 */}
              <Image
                src={`/images/insta-${idx + 1}.jpg`}
                alt="인스타그램 포스트"
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
