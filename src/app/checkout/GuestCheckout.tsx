"use client";
import * as C from "./style";
import BreadCrumb from "@/components/breadcrumb";
import { Column, Table } from "@/components/Table/page";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

interface CartItem {
  product?: {
    id: number;
    name: string;
    price: number;
    img?: string;
  };
  id?: number;
  productName?: string;
  unitPrice?: number;
  quantity: number;
  thumbnail?: string;
}

const STEPS = [
  { label: "장바구니", step: 0, path: "/cart" },
  { label: "주문서작성/결제", step: 1, path: "/checkout" },
  { label: "주문완료", step: 2, path: "/order/success" },
];

export default function GuestCheckoutPage() {
  const [cartItems, setCartItems] = useState<Order[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const idsParam = searchParams.get("ids") || "";
    const requestedIds = idsParam
      .split(",")
      .map((id) => Number(id))
      .filter(Boolean);

    const fetchCartItems = () => {
      let actualCart: CartItem[] = [];

      const localCart = localStorage.getItem("cart");

      if (localCart) {
        actualCart = JSON.parse(localCart);
      }

      const filteredItems = requestedIds.length
        ? actualCart.filter((item) => {
            const productId = item.product?.id || (item as any).id;
            return productId && requestedIds.includes(productId);
          })
        : actualCart;

      if (requestedIds.length !== filteredItems.length) {
        const safeIds = filteredItems
          .map((item) => item.product?.id || item.id)

          .filter(Boolean)
          .join(",");

        window.history.replaceState(
          null,
          "",
          safeIds ? `/checkout?ids=${safeIds}` : `/checkout`,
        );
      }

      setCartItems(
        filteredItems.map((item) => {
          const productId = item.product?.id || (item as any).id;
          const productName = item.product?.name || (item as any).productName;
          const unitPrice = item.product?.price || (item as any).unitPrice;
          const productImage =
            item.thumbnail || item.product?.img || "/img/default.png";

          return {
            id: productId,
            orderId: 0,
            productId: productId,
            productName: productName || "상품명 없음",
            ProductImage: productImage,
            optionText: "",
            unitPrice: unitPrice || 0,
            quantity: item.quantity,
            totalPrice: (unitPrice || 0) * item.quantity,
          };
        }),
      );
    };

    fetchCartItems();
  }, [searchParams]);

  const totalOrderPrice = cartItems.reduce(
    (acc, cur) => acc + cur.unitPrice * cur.quantity,
    0,
  );

  const isFreeDelivery = totalOrderPrice >= 50000;

  const orderColumns: Column<Order>[] = [
    {
      key: "productName",
      label: "상품명",
      flex: 3,
      render: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={row.ProductImage}
            alt={row.productName}
            style={{
              width: "90px",
              height: "90px",
              backgroundColor: "#f4f4f4",
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
            <p style={{ fontWeight: "bold" }}>{row.productName}</p>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>
              {row.optionText || "기본옵션"}
            </p>
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
      render: (row) => <p>{row.unitPrice.toLocaleString()}원</p>,
    },
    {
      key: "totalPrice",
      label: "합계금액",
      flex: 1,
      render: (row) => (
        <p style={{ fontWeight: "bold" }}>
          {(row.quantity * row.unitPrice).toLocaleString()}원
        </p>
      ),
    },
  ];

  return (
    <C.Wrapper>
      <form onSubmit={(e) => e.preventDefault()}>
        <C.SectionHeader>
          <h2>주문서 작성/결제 (비회원)</h2>
          <BreadCrumb steps={STEPS} />
        </C.SectionHeader>

        {/* 비회원 약관동의 */}
        <C.PolicyBox>
          <div>
            <h4>비회원 개인정보 수집·이용 동의</h4>
            <hr />
            <C.TermsList>
              <li>
                1. 개인정보 수집항목: 주문자/수령인 정보(이름, 휴대전화, 주소,
                이메일)
              </li>
              <li>
                2. 수집 및 이용목적: 비회원 주문 확인 및 상품 배송, CS 응대
              </li>
              <li>
                3. 보유 및 이용기간: 목적 달성 후 즉시 파기 (법령 기준 따름)
              </li>
            </C.TermsList>
          </div>
          <C.ConsentWrapper>
            <input type="checkbox" id="privacy-check" required />
            <label htmlFor="privacy-check">
              <span>(필수)</span> 비회원 개인정보 수집 이용에 동의합니다.
            </label>
          </C.ConsentWrapper>
        </C.PolicyBox>

        <C.ProductListWrapper>
          <h4>주문상품</h4>
          <Table columns={orderColumns} data={cartItems} />
        </C.ProductListWrapper>

        <C.OrdererInfoWrapper>
          <fieldset>
            <legend>주문자 정보</legend>
            <hr />
            <C.InputRow>
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="이름을 입력하세요"
                required
              />
            </C.InputRow>
            <C.InputRow>
              <label htmlFor="email">이메일 주소</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@email.com"
                required
              />
            </C.InputRow>
            <C.InputRow>
              <label htmlFor="phone">휴대전화</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="010-0000-0000"
                required
              />
            </C.InputRow>
          </fieldset>
        </C.OrdererInfoWrapper>

        <C.ShippingWrapper>
          <fieldset>
            <legend>배송지 정보</legend>
            <hr />
            <C.InputRow2>
              <label htmlFor="receiverName">받는 분</label>
              <input
                type="text"
                id="receiverName"
                name="receiverName"
                placeholder="이름을 입력하세요"
                required
              />
            </C.InputRow2>

            <C.InputRow2>
              <label>주소</label>
              <div className="address-group">
                <div>
                  <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    placeholder="우편번호"
                    readOnly
                    required
                  />
                  <button type="button">우편번호 찾기</button>
                </div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="기본 주소"
                  readOnly
                  required
                />
                <input
                  type="text"
                  id="detailAddress"
                  name="detailAddress"
                  placeholder="상세 주소"
                  required
                />
              </div>
            </C.InputRow2>

            <C.InputRow2>
              <label htmlFor="cellphone">휴대전화</label>
              <input
                id="cellphone"
                name="cellphone"
                type="tel"
                maxLength={13}
                placeholder="010-0000-0000"
                required
              />
            </C.InputRow2>

            <C.InputRow2>
              <label htmlFor="message">배송메세지</label>
              <select name="message" id="message">
                <option value="">배송 요청사항을 선택해 주세요</option>
                <option value="부재 시 문 앞에 놓아주세요">
                  부재 시 문 앞에 놓아주세요
                </option>
                <option value="배송 전 미리 연락 바랍니다">
                  배송 전 미리 연락 바랍니다
                </option>
                <option value="직접 입력">직접 입력</option>
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
              <dd>{totalOrderPrice.toLocaleString()}원</dd>
            </C.SummaryRow>
            <C.SummaryRow>
              <dt>배송비</dt>
              <dd>{isFreeDelivery ? "0원" : "3,000원"}</dd>
            </C.SummaryRow>
            <C.SummaryRow total>
              <dt>최종 결제 금액</dt>
              <dd>
                {(
                  totalOrderPrice + (isFreeDelivery ? 0 : 3000)
                ).toLocaleString()}
                원
              </dd>
            </C.SummaryRow>
          </dl>
        </C.PayWrapper>

        <C.PaymentMethodWrapper>
          <fieldset>
            <legend>결제 수단 선택</legend>
            <hr />
            <div>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  defaultChecked
                />{" "}
                신용카드
              </label>
              <label>
                <input type="radio" name="paymentMethod" value="bank" />{" "}
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
                  src="/image/kakao_CI_logotype 1.png"
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
                  src="/image/NAVER NPAY LOGO_003 1.png"
                  width={92}
                  height={34}
                  alt="네이버페이"
                />
              </label>
            </div>
          </fieldset>
        </C.PaymentMethodWrapper>

        <C.TermsWrapper>
          <div>
            <input type="checkbox" id="order-agree" required />
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
