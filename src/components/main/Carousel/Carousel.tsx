"use client";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import styles from "./Carousel.module.scss";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const banners = [
  {
    id: 1,
    title: "도복일번지 \nGRAND OPEN",
    desc: "완벽한 핏과 최상의 기능성, 새로운 도복의 표준을 경험하세요.",
    img: "https://res.cloudinary.com/dxak1ux7x/image/upload/f_auto,q_auto/v1777973366/1_xvd4ub.png",
    className: "first",
  },
  {
    id: 2,
    title: "노력의 결과를 두르다.",
    desc: "수많은 땀방울이 만들어낸 수련의 깊이,\n도복일번지와 함께 시작하세요.",
    img: "https://res.cloudinary.com/dxak1ux7x/image/upload/f_auto,q_auto/v1777973365/2_f8dntg.png",
    className: "second",
    link: "/products/ttibok/belt",
  },
  {
    id: 3,
    title: "수련의 완성",
    desc: "기본 도복부터 훈련용품까지,\n당신의 태권도 라이프를 도복일번지에서 만나보세요.",
    img: "https://res.cloudinary.com/dxak1ux7x/image/upload/f_auto,q_auto/v1778427749/33_jnuv0f.png",
    className: "third",
    link: "/products/accessories",
  },
];

function CarouselControls() {
  const swiper = useSwiper();

  const moveNext = () => {
    swiper.slideNext();
  };

  const movePrev = () => {
    swiper.slidePrev();
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.navBtn} ${styles.prevBtn}`}
        onClick={movePrev}
        aria-label="이전 슬라이드"
      />
      <button
        type="button"
        className={`${styles.navBtn} ${styles.nextBtn}`}
        onClick={moveNext}
        aria-label="다음 슬라이드"
      />
    </>
  );
}

export default function Carousel() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <div className={styles.container}>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={800}
        pagination={{ clickable: true }}
      >
        <CarouselControls />

        {banners.map((banner, index) => (
          <SwiperSlide key={`banner-${banner.id}-${index}`}>
            <div className={`${styles.slideItem} ${styles[banner.className]}`}>
              <Image
                src={banner.img}
                alt={banner.title}
                fill
                className={styles.bgImage}
                loading="eager"
                decoding="async"
                quality={100}
                sizes="100vw"
              />
              <div className={styles.overlay} />

              <div className={styles.textGroup}>
                <h2>
                  {banner.title.split("\n").map((line, idx) => (
                    <span key={idx} style={{ display: "block" }}>
                      {line}
                    </span>
                  ))}
                </h2>
                <p>
                  {banner.desc.split("\n").map((line, idx) => (
                    <span key={idx} style={{ display: "block" }}>
                      {line}
                    </span>
                  ))}
                </p>
                {banner.link && (
                  <Link className={styles.detailBtn} href={banner.link}>
                    바로 가기
                    <ArrowRight
                      style={{
                        marginLeft: "8px",
                        width: "18px",
                        height: "18px",
                      }}
                    />
                  </Link>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
