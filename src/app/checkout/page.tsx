"use client";
import * as C from "./style";
import BreadCrumb from "@/components/breadcrumb";
import { Column, table } from "@/components/Table/page";
import Image from "next/image";
import { useState } from "react";

export interface Order {
  id: number;
  orderId: number;
  productId: number;
  requestedAt?: string;
  productName: string;
  ProductImage: string;
  optionText: string;
  unitPrice: number;
  quantity: number;
  totalPrice?: number;
}

const STEPS = [
  { label: "장바구니", step: 0, path: "/cart" },
  { label: "주문서작성/결제", step: 1, path: "/checkout" },
  { label: "주문완료", step: 2, path: "/order/success" },
];

const user = false;

[
  {
    id: 1,
    orderId: 1,
    productId: 1,
    productName: "아디다스 품새도복",
    ProductImage: "",
    optionText: "빨강",
    unitPrice: 57600,
    quantity: 1,
  },
];

export default function CheckoutPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      orderId: 1,
      productId: 1,
      productName: "아디다스 품새도복",
      ProductImage: "",
      optionText: "빨강",
      unitPrice: 5000,
      quantity: 2,
    },
    {
      id: 1,
      orderId: 1,
      productId: 1,
      productName: "아디다스 품새도복",
      ProductImage: "",
      optionText: "빨강",
      unitPrice: 30000,
      quantity: 2,
    },
  ]);

  // 1. 전체 상품의 총 금액 계산 (상품금액 * 수량의 총합)
  const totalOrderPrice = orders.reduce(
    (acc, cur) => acc + cur.unitPrice * cur.quantity,
    0,
  );

  // 2. 전체 금액이 50,000원 이상인지 여부
  const isFreeDelivery = totalOrderPrice >= 50000;

  const orderColumns: Column<Order>[] = [
    {
      key: "productName",
      label: "상품명",
      flex: 3, // 상품명은 좀 더 넓게
      render: (row) => (
        <div style={{ display: "flex" }}>
          <img
            src={row.ProductImage}
            alt={row.productName}
            style={{
              width: "90px",
              height: "90px",
              display: "block",
              backgroundColor: "#333",
              margin: "0 25px 0 30px",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <p>{row.productName}</p>
            <p>빨강</p>
          </div>
        </div>
      ),
    },
    {
      key: "quantity",
      label: "수량",
      flex: 1,
      render: (row) => <p>{row.quantity}개</p>,
    },
    {
      key: "unitPrice",
      label: "상품금액",
      flex: 1,
      render: (row) => (
        <>
          <p className="price-text">{row.unitPrice.toLocaleString()}원</p>
        </>
      ),
    },
    {
      key: "totalPrice",
      label: "합계금액",
      flex: 1,
      render: (row) => (
        <p>{(row.quantity * row.unitPrice).toLocaleString()}원</p>
      ),
    },
  ];

  const [currentPage, setCurrentPage] = useState(0); // react-paginate는 0부터 시작

  const itemsPerPage = 10;
  const currentItems = orders.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  return (
    <C.Wrapper>
      <form action="">
        <C.SectionHeader>
          <h2>주문서 작성/결제</h2>
          <BreadCrumb steps={STEPS} />
        </C.SectionHeader>

        <C.PolicyBox>
          <div>
            <h4>비회원 개인정보 수집·이용 동의</h4>
            <hr />
            <C.TermsList>
              <li>
                1. 개인정보 수집항목
                <ul>
                  <li>- 주문자/수령인 정보(이름, 휴대전화, 주소, 이메일)</li>
                  <li>- 결제정보(카드사명, 카드번호 일부 등)</li>
                </ul>
              </li>

              <li>
                2. 수집 및 이용목적
                <ul>
                  <li>- 비회원 주문 확인 및 상품 배송 서비스 제공</li>
                  <li>- 결제 및 환불 처리 등 계약의 이행</li>
                  <li>- 배송 관련 안내 및 고객 상담(CS)</li>
                </ul>
              </li>

              <li>
                3. 개인정보의 보유 및 이용기간
                <p>- 목적 달성 후 즉시 파기 (단, 관계법령에 따라 5년간 보관)</p>
              </li>
            </C.TermsList>
          </div>

          <C.ConsentWrapper>
            <input type="checkbox" id="privacy-check" />
            <label htmlFor="privacy-check">
              <span>(필수)</span> 비회원 개인정보 수집 이용에 대한 내용을
              확인하였으며 이에 동의합니다.
            </label>
          </C.ConsentWrapper>
        </C.PolicyBox>

        <C.ProductListWrapper>
          <h4>주문상품</h4>
          <table columns={orderColumns} data={currentItems} />
        </C.ProductListWrapper>

        <C.OrdererInfoWrapper>
          <fieldset>
            <legend>주문자 정보</legend>

            <hr />

            <C.InputRow>
              <label htmlFor="name">이름</label>
              <input type="text" id="name" placeholder="이름을 입력하세요" />
            </C.InputRow>
            <C.InputRow>
              <label htmlFor="email">이메일 주소</label>
              <input type="email" id="email" placeholder="example@email.com" />
            </C.InputRow>
            <C.InputRow>
              <label htmlFor="phone">휴대전화</label>
              <input type="tel" id="phone" placeholder="010-0000-0000" />
            </C.InputRow>
          </fieldset>
        </C.OrdererInfoWrapper>

        <C.ShippingWrapper>
          <fieldset>
            <legend>배송지 정보</legend>
            <hr />

            <C.InputRow2 radio>
              <p>배송지 선택</p>

              <ul>
                <li>
                  <input type="radio" id="shipping-same" name="shippingType" />
                  <label htmlFor="shipping-same">주문자 정보와 동일</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="shipping-default"
                    name="shippingType"
                  />
                  <label htmlFor="shipping-default">기본 배송지</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="shipping-recent"
                    name="shippingType"
                  />
                  <label htmlFor="shipping-recent">최근 배송지</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="shipping-custom"
                    name="shippingType"
                  />
                  <label htmlFor="shipping-custom">직접 입력</label>
                </li>
              </ul>
            </C.InputRow2>

            <C.InputRow2 radio={false}>
              <label htmlFor="receiverName">받는 분</label>
              <input
                type="text"
                id="receiverName"
                placeholder="이름을 입력하세요"
              />
            </C.InputRow2>

            <C.InputRow2>
              <label>주소</label>

              <div className="address-group">
                <div>
                  <input
                    type="text"
                    id="postcode"
                    placeholder="우편번호"
                    readOnly
                  />
                  <button type="button">우편번호 찾기</button>
                </div>

                <input type="text" id="address" placeholder="기본 주소" />
                <input type="text" id="detailAddress" placeholder="상세 주소" />
              </div>
            </C.InputRow2>

            <C.InputRow2>
              <label htmlFor="cellphone">휴대전화</label>

              <input
                id="cellphone"
                type="tel"
                inputMode="numeric"
                maxLength={13}
                placeholder="010-0000-0000"
              />
            </C.InputRow2>

            <C.InputRow2>
              <label htmlFor="message">배송메세지</label>

              <select name="" id="message">
                <option value="">배송 요청사항을 선택해 주세요</option>
              </select>
            </C.InputRow2>
          </fieldset>
        </C.ShippingWrapper>

        <C.PayWrapper>
          <h3>결제 정보</h3>

          <hr />

          <dl>
            <C.SummaryRow>
              <dt>주문 상품</dt>
              <dd>345,600원</dd>
            </C.SummaryRow>

            <C.SummaryRow>
              <dt>배송비</dt>
              <dd>0원</dd>
            </C.SummaryRow>

            <C.SummaryRow total>
              <dt>최종 결제 금액</dt>
              <dd>345,600원</dd>
            </C.SummaryRow>
          </dl>
        </C.PayWrapper>

        <C.PaymentMethodWrapper>
          <fieldset>
            <legend>결제 수단 선택</legend>

            <hr />

            <div>
              <label>
                <input type="radio" name="paymentMethod" value="card" />
                신용카드
              </label>

              <label>
                <input type="radio" name="paymentMethod" value="bank" />
                계좌이체
              </label>

              <label htmlFor="kakaoPay" className="payment-option">
                <input
                  type="radio"
                  id="kakaoPay"
                  name="paymentMethod"
                  value="kakaoPay"
                />
                <Image
                  src={"/image/kakao_CI_logotype 1.png"}
                  width={95}
                  height={22}
                  alt="카카오페이"
                />
              </label>

              <label htmlFor="naverPay" className="payment-option">
                <input
                  type="radio"
                  id="naverPay"
                  name="paymentMethod"
                  value="naverPay"
                />
                <Image
                  src={"/image/NAVER NPAY LOGO_003 1.png"}
                  width={92}
                  height={34}
                  alt="카카오페이"
                />
              </label>
            </div>

            <p>
              · 할부 최소 금액은 5만원이며 30만원 이상 결제 시 공인인증서가
              필요합니다.
            </p>
          </fieldset>
        </C.PaymentMethodWrapper>

        <C.TermsWrapper>
          <div>
            <input type="checkbox" id="order-agree" />
            <label htmlFor="order-agree">
              결제 정보를 확인하였으며, 구매 진행에 동의합니다.
            </label>
          </div>

          <button type="submit">결제하기</button>
        </C.TermsWrapper>
      </form>
    </C.Wrapper>
  );
}
