"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import styles from "./Carousel.module.scss";
import Image from "next/image";
import { useState } from "react";

const banners = [
  {
    id: 1,
    title: "PREMIUM DOBOK",
    desc: "최고의 퍼포먼스를 위한 선택",
    img: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1000&auto=format",
  },
  {
    id: 2,
    title: "NEW ARRIVALS",
    desc: "2026 S/S 신상 라인업 공개",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format",
  },
  {
    id: 3,
    title: "SEASON OFF",
    desc: "한정 수량 최대 40% 세일",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format",
  },
];

export default function Carousel() {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className={`${styles.container} ${!isReady ? styles.notReady : ""}`}>
      <div className={`${styles.navBtn} ${styles.prevBtn}`}></div>
      <div className={`${styles.navBtn} ${styles.nextBtn}`}></div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        onSwiper={(swiper) => {
          setIsReady(true);

          setTimeout(() => {
            swiper.update();
          }, 100);
        }}
        loop={true}
        observer={true}
        observeParents={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: "#btn-prev",
          nextEl: "#btn-next",
        }}
        slidesPerView={1}
        className={styles.mySwiper}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className={styles.slideItem}>
              <Image
                src={banner.img}
                alt={banner.title}
                fill
                priority
                className={styles.bgImage}
                sizes="100vw"
              />
              <div className={styles.overlay} />
              <div className={styles.textGroup}>
                <h2>{banner.title}</h2>
                <p>{banner.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
