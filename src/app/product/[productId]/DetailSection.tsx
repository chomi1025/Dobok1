import Image from "next/image";
import styles from "./Detailsection.module.scss";

export default function DetailSection({ product }) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav className={styles.tabArea} aria-label="상품 상세정보 네비게이션">
        <ul>
          <li onClick={() => scrollToSection("detail")}>상세정보</li>
          <li onClick={() => scrollToSection("review")}>후기</li>
          <li onClick={() => scrollToSection("info")}>구매안내</li>
        </ul>
      </nav>

      <section className={styles.detailArea} id="detail">
        <div>
          {product.images.map((img) => (
            <Image src={img} alt={"이미지"} width={1040} height={0} />
          ))}
        </div>
      </section>
    </>
  );
}
