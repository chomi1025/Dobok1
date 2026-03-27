"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./Carousel.module.scss";

export default function Carousel() {
  const originalBanners = [
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

  const totalCount = originalBanners.length;

  const banners = [
    ...originalBanners,
    ...originalBanners.map((b) => ({ ...b, id: b.id + totalCount })),
  ];

  return (
    <div className={styles.container}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        centeredSlides={true}
        loop={true}
        initialSlide={0}
        slidesPerView={1.5}
        spaceBetween={20}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onSlideChange={(swiper) => {
          const realIndex = swiper.realIndex;
          const bullets = swiper.pagination.bullets;

          if (bullets && bullets.length > 0) {
            bullets.forEach((b) =>
              b.classList.remove("swiper-pagination-bullet-active"),
            );

            const targetIndex = realIndex % totalCount;
            if (bullets[targetIndex]) {
              bullets[targetIndex].classList.add(
                "swiper-pagination-bullet-active",
              );
            }
          }
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            if (index < 3) {
              return `<span class="${className}"></span>`;
            }
            return "";
          },
        }}
        navigation={true}
        className={styles.mySwiper}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className={styles.slideItem}
              style={{ backgroundImage: `url(${banner.img})` }}
            >
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
