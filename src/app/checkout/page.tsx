"use client";
import * as C from "./style";
import BreadCrumb from "@/components/breadcrumb";
import {
  Column,
  OrdersTable,
} from "@/components/mypage/ordersTable/ordersTable";
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
        <OrdersTable columns={orderColumns} data={currentItems} />
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
    </C.Wrapper>
  );
}
