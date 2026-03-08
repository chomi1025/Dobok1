"use client";
import * as S from "./style";

export default function ShippingPage() {
  return (
    <S.Inner>
      <h2>교환 / 반품 / 환불 안내</h2>

      <section>
        <h3>1. 교환 및 반품 신청</h3>
        <ul>
          <li>· 상품 수령 후 7일 이내 신청 가능합니다.</li>
          <li>
            · 단순 변심에 의한 교환/반품의 경우 왕복 배송비는 고객 부담입니다.
          </li>
          <li>
            · 사용 흔적이 있거나 상품 가치가 훼손된 경우 처리가 제한될 수
            있습니다.
          </li>
        </ul>
      </section>

      <section>
        <h3>2. 불량 상품 안내</h3>
        <ul>
          <li>
            · 상품 불량 또는 오배송의 경우, 확인 후 교환 또는 환불
            처리해드립니다.
          </li>
          <li>
            · 수작업 상품의 특성상 당사 과실로 인한 불량이 확인될 경우, 새로
            제작하여 교환을 우선적으로 진행해드립니다.
          </li>
        </ul>
      </section>

      <section>
        <h3>3. 환불 안내</h3>
        <ul>
          <li>
            · 반품 상품이 입고 및 검수 완료된 후 2~5영업일 이내 환불 처리됩니다.
          </li>
          <li>· 결제 수단에 따라 환불 소요 기간이 달라질 수 있습니다.</li>
        </ul>
      </section>
    </S.Inner>
  );
}
