"use client";
import * as C from "./style";
import BreadCrumb from "@/components/breadcrumb";
import { Column, Table } from "@/components/Table/page";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// 주문 상품 타입
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

// 장바구니 아이템 타입
interface CartItem {
  product: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
}

// 사용자 정보 타입
export interface GuestUser {
  postcode: string;
  address: string;
  detailAddress: string;
  name: string;
  phone: string;
  email: string;
}

// 배송 정보 타입
interface ShippingInfo {
  postcode: string;
  address: string;
  detailAddress: string;
  receiverName: string;
  cellphone: string;
}

// Props 타입
interface GuestCheckoutPageProps {
  user?: GuestUser | null;
}

const STEPS = [
  { label: "장바구니", step: 0, path: "/cart" },
  { label: "주문서작성/결제", step: 1, path: "/checkout" },
  { label: "주문완료", step: 2, path: "/order/success" },
];

export default function GuestCheckoutPage({ user }: GuestCheckoutPageProps) {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState<Order[]>([]);
  const searchParams = useSearchParams();
  const [selectedShipping, setSelectedShipping] = useState("same"); // 디폴트 주문자정보와 동일
  const [shippingInfo, setShippingInfo] = useState({
    postcode: user?.postcode || "",
    address: user?.address || "",
    detailAddress: user?.detailAddress || "",
    receiverName: user?.name || "",
    cellphone: user?.phone || "",
  });

  useEffect(() => {
    if (status === "loading") return;

    // 1️⃣ URL에서 ids 가져오기
    const idsParam = searchParams.get("ids") || "";
    const requestedIds = idsParam
      .split(",")
      .map((id) => Number(id))
      .filter(Boolean);

    const fetchCartItems = async () => {
      let actualCart: CartItem[] = [];

      if (session) {
        // 회원: 서버에서 장바구니 가져오기
        const res = await fetch("/api/cart");
        if (!res.ok) return;
        const data: CartItem[] = await res.json();
        actualCart = data.map((item) => ({
          product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
          },
          quantity: item.quantity,
        }));
      } else {
        // 비회원: 로컬스토리지
        const localCart =
          localStorage.getItem("checkoutItems") ||
          localStorage.getItem("guestCart");
        if (localCart) actualCart = JSON.parse(localCart);
      }

      const filteredItems = requestedIds.length
        ? actualCart.filter((item) => requestedIds.includes(item.product.id))
        : actualCart;

      if (requestedIds.length !== filteredItems.length) {
        const safeIds = filteredItems.map((item) => item.product.id).join(",");
        if (safeIds) {
          window.history.replaceState(null, "", `/checkout?ids=${safeIds}`);
        } else {
          window.history.replaceState(null, "", `/checkout`);
        }
      }

      setCartItems(
        filteredItems.map((item) => ({
          id: item.product.id,
          orderId: 0,
          productId: item.product.id,
          productName: item.product.name,
          ProductImage: "/img/default.png",
          optionText: "",
          unitPrice: item.product.price,
          quantity: item.quantity,
          totalPrice: item.product.price * item.quantity,
        })),
      );
    };

    fetchCartItems();
  }, [session, status, searchParams]);

  // 배송지 선택 변경 시 자동 채워주기
  useEffect(() => {
    if (selectedShipping === "same" && user) {
      setShippingInfo({
        postcode: user.postcode,
        address: user.address,
        detailAddress: user.detailAddress,
        receiverName: user.name,
        cellphone: user.phone,
      });
    }
    // 다른 선택지는 직접 입력 또는 기본/최근 배송지 로직 추가 가능
  }, [selectedShipping, user]);

  // 1. 전체 상품의 총 금액 계산 (상품금액 * 수량의 총합)
  const totalOrderPrice = cartItems.reduce(
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

  console.log(user);
  return (
    <C.Wrapper>
      <form action="">
        <C.SectionHeader>
          <h2>주문서 작성/결제</h2>
          <BreadCrumb steps={STEPS} />
        </C.SectionHeader>

        {/* 비회원용 약관동의 */}
        {!session && (
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
                  <p>
                    - 목적 달성 후 즉시 파기 (단, 관계법령에 따라 5년간 보관)
                  </p>
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
        )}

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
              {user ? (
                <span>{user.name}</span>
              ) : (
                <input type="text" id="name" placeholder="이름을 입력하세요" />
              )}
            </C.InputRow>
            <C.InputRow>
              <label htmlFor="email">이메일 주소</label>
              {user ? (
                <span>{user.email}</span>
              ) : (
                <input
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                />
              )}
            </C.InputRow>
            <C.InputRow>
              <label htmlFor="phone">휴대전화</label>
              {user ? (
                <span>{user.phone}</span>
              ) : (
                <input type="tel" id="phone" placeholder="010-0000-0000" />
              )}
            </C.InputRow>
          </fieldset>
        </C.OrdererInfoWrapper>

        <C.ShippingWrapper>
          <fieldset>
            <legend>배송지 정보</legend>
            <hr />

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
              <dd>{totalOrderPrice.toLocaleString()}원</dd>
            </C.SummaryRow>

            <C.SummaryRow>
              <dt>배송비</dt>
              <dd>{isFreeDelivery ? "0원" : "3,000원"}</dd>
            </C.SummaryRow>

            <C.SummaryRow total>
              <dt>최종 결제 금액</dt>
              <dd>
                {(isFreeDelivery
                  ? totalOrderPrice
                  : totalOrderPrice + 3000
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
