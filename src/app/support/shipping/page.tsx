import styles from "./page.module.scss";

export const metadata = {
  title: "도복일번지 - 주문 및 배송 안내 | 빠르고 안전한 배송 안내",
  description:
    "도복일번지 주문 / 배송 안내 페이지입니다. 상품 선택, 결제, 출고 및 배송 과정, 취소 방법까지 상세하게 안내합니다.",
  keywords: ["도복일번지", "주문", "배송", "취소", "결제", "배송안내"],
  openGraph: {
    title: "도복일번지 - 주문 및 배송 안내",
    description:
      "도복일번지 주문 / 배송 안내 페이지입니다. 상품 선택, 결제, 출고 및 배송 과정, 취소 방법까지 상세하게 안내합니다.",
    url: "https://dobokilbunji.com/shipping",
    type: "website",
    images: [
      {
        url: "https://dobokilbunji.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "도복일번지 주문/배송 안내",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "도복일번지 - 주문 및 배송 안내",
    description:
      "도복일번지 주문 / 배송 안내 페이지입니다. 상품 선택, 결제, 출고 및 배송 과정, 취소 방법까지 상세하게 안내합니다.",
    images: ["https://dobokilbunji.com/og-image.png"],
  },
};

export default function ShippingPage() {
  return (
    <div className={styles.inner}>
      <header aria-label="페이지 헤더">
        <h1>주문 / 배송 안내</h1>
      </header>

      <section aria-label="주문 방법 안내">
        <h2>1. 주문 방법</h2>
        <ul>
          <li>
            · 상품 선택 후 장바구니에 담아 결제를 완료하시면 주문이 접수됩니다.
          </li>
          <li>
            · 결제 수단: 신용카드, 계좌이체, 간편결제(카카오페이, 네이버페이 등)
          </li>
          <li>
            · 주문 완료 후 이메일 또는 문자로 주문 내역이 발송되며,
            마이페이지에서도 확인 가능합니다.
          </li>
        </ul>
      </section>

      <section aria-label="배송 안내">
        <h2>2. 배송 안내</h2>
        <ul>
          <li>· 주문 완료 후 평균 2~3일 이내 출고됩니다.</li>
          <li>· 지역 및 택배사 사정에 따라 배송이 지연될 수 있습니다.</li>
          <li>· 상품 출고 시 운송장 번호가 안내됩니다.</li>
          <li>· 배송지 변경은 상품 출고 전까지만 가능합니다.</li>
        </ul>
      </section>

      <section aria-label="주문 취소 안내">
        <h2>3. 주문 취소 안내</h2>
        <ul>
          <li>
            · 주문 취소는 **상품 준비중 이전 단계(결제 완료 상태)**에서만
            가능합니다.
          </li>
          <li>
            · 상품이 출고 준비 단계에 들어간 이후에는 취소가 불가하오니 신중한
            구매 부탁드립니다.
          </li>
        </ul>
      </section>
    </div>
  );
}
