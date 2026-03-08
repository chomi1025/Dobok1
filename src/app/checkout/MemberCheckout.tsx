"use client";
import * as C from "./style";
import BreadCrumb from "@/components/breadcrumb";
import { Column, Table } from "@/components/Table/page";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

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
  product: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
}

const STEPS = [
  { label: "장바구니", step: 0, path: "/cart" },
  { label: "주문서작성/결제", step: 1, path: "/checkout" },
  { label: "주문완료", step: 2, path: "/order/success" },
];

interface Props {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    postcode: string;
    address: string;
    detailAddress: string;
  };
}

interface ShippingForm {
  shippingType: "default" | "custom"; // 추가
  receiverName: string;
  postcode: string;
  address: string;
  detailAddress: string;
  cellphone: string;
  message: string;
  paymentMethod: string;
  agree: boolean;
}

export default function MemberCheckoutPage({ user }: Props) {
  const searchParams = useSearchParams();
  const [cartItems, setCartItems] = useState<Order[]>([]);
  const [selectedShipping, setSelectedShipping] = useState("default");

  // Yup validation schema
  const schema = yup.object().shape({
    shippingType: yup.string().oneOf(["default", "custom"]).required(), // 추가
    receiverName: yup.string().required("받는 분 이름을 입력하세요"),
    postcode: yup.string().required("우편번호를 입력하세요"),
    address: yup.string().required("주소를 입력하세요"),
    detailAddress: yup.string().required("상세주소를 입력하세요"),
    cellphone: yup
      .string()
      .required("휴대전화 입력 필수")
      .matches(
        /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/,
        "전화번호 형식이 올바르지 않습니다",
      ), // phone -> cellphone으로 수정
    message: yup.string().required("배송 메시지를 입력하세요"),
    paymentMethod: yup.string().required(),
    agree: yup.boolean().oneOf([true], "구매 진행에 동의해주세요").required(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<ShippingForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      shippingType: "default",
      receiverName: user.name,
      postcode: user.postcode, // zipCode -> postcode로 수정
      address: user.address,
      detailAddress: user.detailAddress, // address2 -> detailAddress로 수정
      cellphone: user.phone, // phone -> cellphone으로 수정
      message: undefined,
      paymentMethod: "card", // 기본 결제 수단 설정
      agree: false, // 동의 여부 기본값
    },
  });
  // URL에서 주문할 상품 IDs 가져오기 + 서버 장바구니 fetch
  useEffect(() => {
    const idsParam = searchParams.get("ids") || "";
    const requestedIds = idsParam
      .split(",")
      .map((id) => Number(id))
      .filter(Boolean);

    const fetchCartItems = async () => {
      const res = await fetch("/api/cart"); // 서버 장바구니 API
      if (!res.ok) return;
      const data: CartItem[] = await res.json();

      const filteredItems = requestedIds.length
        ? data.filter((item) => requestedIds.includes(item.product.id))
        : data;

      // URL 안전하게 조정
      if (requestedIds.length !== filteredItems.length) {
        const safeIds = filteredItems.map((item) => item.product.id).join(",");
        window.history.replaceState(
          null,
          "",
          safeIds ? `/checkout?ids=${safeIds}` : `/checkout`,
        );
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
  }, [searchParams]);

  // 배송지 선택 시 주문자 정보로 자동 채우기
  useEffect(() => {
    if (selectedShipping === "default") {
      reset({
        receiverName: user.name,
        postcode: user.postcode,
        address: user.address,
        detailAddress: user.detailAddress,
        cellphone: user.phone,
        message: "",
      });
    } else if (selectedShipping === "custom") {
      reset({
        receiverName: "",
        postcode: "",
        address: "",
        detailAddress: "",
        cellphone: "",
        message: "",
      });
    }
  }, [selectedShipping, user, reset]);

  // 총 금액 계산
  const totalOrderPrice = cartItems.reduce(
    (acc, cur) => acc + cur.unitPrice * cur.quantity,
    0,
  );

  // 전체 금액이 50,000원 이상인지
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

              <span>{user.name}</span>
            </C.InputRow>
            <C.InputRow>
              <label htmlFor="email">이메일 주소</label>

              <span>{user.email}</span>
            </C.InputRow>
            <C.InputRow>
              <label htmlFor="phone">휴대전화</label>

              <span>{user.phone}</span>
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
                  <input
                    type="radio"
                    id="shipping-default"
                    value="default"
                    checked={selectedShipping === "default"}
                    onChange={() => setSelectedShipping("default")}
                  />
                  <label htmlFor="shipping-default">기본 배송지</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="shipping-custom"
                    value="custom"
                    checked={selectedShipping === "custom"}
                    onChange={() => setSelectedShipping("custom")}
                  />
                  <label htmlFor="shipping-custom">직접 입력</label>
                </li>
              </ul>
            </C.InputRow2>

            <C.InputRow2>
              <label>받는 분</label>
              <input
                {...register("receiverName")}
                placeholder="이름을 입력하세요"
              />
              {errors.receiverName && (
                <p className="error">{errors.receiverName.message}</p>
              )}
            </C.InputRow2>

            <C.InputRow2>
              <label>주소</label>
              <div className="address-group">
                <div>
                  <input
                    {...register("detailAddress")}
                    placeholder="우편번호"
                    readOnly={selectedShipping === "default"}
                  />
                  <button type="button">우편번호 찾기</button>
                </div>
                <input
                  {...register("address")}
                  placeholder="기본 주소"
                  readOnly={selectedShipping === "default"}
                />
                <input
                  {...register("detailAddress")}
                  placeholder="상세 주소"
                  readOnly={selectedShipping === "default"}
                />
              </div>
              {(errors.postcode || errors.address || errors.detailAddress) && (
                <p className="error">
                  {errors.postcode?.message ||
                    errors.address?.message ||
                    errors.detailAddress?.message}
                </p>
              )}
            </C.InputRow2>

            <C.InputRow2>
              <label>휴대전화</label>
              <input {...register("cellphone")} placeholder="010-0000-0000" />
              {errors.cellphone && (
                <p className="error">{errors.cellphone.message}</p>
              )}
            </C.InputRow2>

            <C.InputRow2>
              <label>배송메세지</label>
              <select {...register("message")}>
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
                <input
                  type="radio"
                  value="card"
                  {...register("paymentMethod" as any)}
                />{" "}
                신용카드
              </label>
              <label>
                <input
                  type="radio"
                  value="bank"
                  {...register("paymentMethod" as any)}
                />{" "}
                계좌이체
              </label>
              <label htmlFor="kakaoPay">
                <input
                  type="radio"
                  id="kakaoPay"
                  value="kakaoPay"
                  {...register("paymentMethod" as any)}
                />
                <Image
                  src={"/image/kakao_CI_logotype 1.png"}
                  width={95}
                  height={22}
                  alt="카카오페이"
                />
              </label>
              <label htmlFor="naverPay">
                <input
                  type="radio"
                  id="naverPay"
                  value="naverPay"
                  {...register("paymentMethod" as any)}
                />
                <Image
                  src={"/image/NAVER NPAY LOGO_003 1.png"}
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
            <input
              type="checkbox"
              id="order-agree"
              {...register("agree" as any)}
            />
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
