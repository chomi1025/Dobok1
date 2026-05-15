"use client";
import Button from "@/components/common/buttons/page";
import styles from "./MemberCheckout.module.scss";
import BreadCrumb from "@/components/breadcrumb";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DaumPostcodeEmbed from "react-daum-postcode";
import toast from "react-hot-toast";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import Script from "next/script";
import { UnifiedTable } from "@/components/common/DataTable";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

declare global {
  interface Window {
    IMP: any;
  }
}

export const guestOrderSchema = yup.object({
  // 주문자 정보
  name: yup.string().required("이름을 입력해주세요."),
  email: yup
    .string()
    .email("올바른 이메일 형식이 아닙니다.")
    .required("이메일을 입력해주세요."),
  phone: yup
    .string()
    .matches(/^010-\d{4}-\d{4}$/, "010-0000-0000 형식으로 입력해주세요.")
    .required("휴대전화 번호는 필수입니다."),

  // 배송지
  receiverName: yup.string().required("받는 분 이름을 입력해주세요."),
  postcode: yup.string().required("우편번호를 입력해주세요."),
  address: yup.string().required("기본 주소를 입력해주세요."),
  detailAddress: yup.string().required("상세 주소를 입력해주세요."),
  customRequest: yup
    .string()
    .max(50, "자수 문구는 50자 이내로 입력해주세요.")
    .optional(),
  customFiles: yup.mixed<File[]>().nullable().optional(),
  message: yup.string().optional(),
  cellphone: yup
    .string()
    .matches(/^010-\d{4}-\d{4}$/, "010-0000-0000 형식으로 입력해주세요.")
    .required("받는 분 연락처는 필수입니다."),

  // 결제
  paymentMethod: yup
    .string()
    .oneOf(["card", "bank", "kakaoPay", "naverPay"])
    .required(),

  orderAgree: yup.boolean().oneOf([true], "구매 진행 동의가 필요합니다."),
});

export interface GuestOrderFormData {
  name: string;
  email: string;
  phone: string;
  receiverName: string;
  postcode: string;
  address: string;
  detailAddress: string;
  cellphone: string;
  paymentMethod: "card" | "bank" | "kakaoPay" | "naverPay";
  orderAgree: boolean;
  customRequest?: string;
  customFiles?: File[] | null;
  message?: string;
}

export interface Order {
  id: number;
  orderId: number;
  productId: number;
  requestedAt?: string;
  productName: string;
  productImage: string;
  optionText: string;
  unitPrice: number;
  originalPrice?: number;
  quantity: number;
  totalPrice?: number;
  isCustomizable?: boolean;
}

interface MemberUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    address: string;
    postCode: string;
    detailAddress: string;
  };
}

interface FormattedCartItem {
  id: number;
  quantity: number;
  productId: number;

  name: string;
  optionId: number;

  thumbnail: string | null;
  description: string | null;

  isCustomizable: boolean;

  originalPrice?: number;
  price: number;

  optionName?: string | null;
  optionValue?: string | null;
  optionName2?: string | null;
  optionValue2?: string | null;
}

interface Props {
  user: MemberUser;
  memberUser: MemberUser;
  memberCart: FormattedCartItem[];
}

const STEPS = [
  { label: "장바구니", step: 0, path: "/cart" },
  { label: "주문서작성/결제", step: 1, path: "/checkout" },
  { label: "주문완료", step: 2, path: "/order/success" },
];

const columnHelper = createColumnHelper<Order>();

export default function MemberCheckoutPage({ user, memberCart }: Props) {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids") || "";
  const requestedIds = idsParam.split(",").map(Number).filter(Boolean);
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<GuestOrderFormData>({
    resolver: yupResolver(guestOrderSchema) as any,
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      receiverName: "",
      postcode: "",
      address: "",
      detailAddress: "",
      customRequest: "",
      paymentMethod: "card",
      orderAgree: false,
    },
  });

  const [isSameAsOrderer, setIsSameAsOrderer] = useState(false);

  const handleSameAsOrderer = (checked: boolean) => {
    setIsSameAsOrderer(checked);

    if (checked) {
      setValue("receiverName", user.name);
      setValue("cellphone", user.phone);

      setValue("postcode", user.address.postCode);
      setValue("address", user.address.address);
      setValue("detailAddress", user.address.detailAddress);

      clearErrors([
        "receiverName",
        "cellphone",
        "postcode",
        "address",
        "detailAddress",
      ]);
    } else {
      setValue("receiverName", "");
      setValue("cellphone", "");
      setValue("postcode", "");
      setValue("address", "");
      setValue("detailAddress", "");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);

        setValue("customFiles", [file]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") extraAddress += data.bname;
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setValue("postcode", data.zonecode);
    setValue("address", fullAddress);

    trigger(["postcode", "address"]);

    setIsOpen(false);
  };

  const baseCartItems = memberCart;

  const filteredCartItems = useMemo(() => {
    if (requestedIds.length === 0) return baseCartItems;
    return baseCartItems.filter((item) =>
      requestedIds.includes(item.productId),
    );
  }, [memberCart, requestedIds]);

  const cartItems: Order[] = useMemo(() => {
    return filteredCartItems.map((item) => ({
      id: item.id,
      orderId: 0,
      productId: item.productId,

      optionId: item.optionId || item.id,

      productName: item.name,
      productImage: item.thumbnail || "/img/default.png",

      optionText: [
        item.optionName && item.optionValue
          ? `${item.optionName}: ${item.optionValue}`
          : null,

        item.optionName2 && item.optionValue2
          ? `${item.optionName2}: ${item.optionValue2}`
          : null,
      ]
        .filter(Boolean)
        .join(" / "),

      unitPrice: item.price,
      originalPrice: item.originalPrice,
      quantity: item.quantity,
      totalPrice: item.price * item.quantity,
      isCustomizable: item.isCustomizable,
    }));
  }, [filteredCartItems]);

  const totalOrderPrice = cartItems.reduce(
    (acc, cur) => acc + cur.unitPrice * cur.quantity,
    0,
  );

  const isFreeDelivery = totalOrderPrice >= 50000;

  const hasCustomItem = cartItems.some((item) => item.isCustomizable);

  const getDiscountInfo = (originalPrice?: number, price?: number) => {
  if (!originalPrice || !price || originalPrice <= price) {
    return null;
  }

  const discountRate = Math.round(
    ((originalPrice - price) / originalPrice) * 100,
  );

  return {
    originalPrice,
    price,
    discountRate,
  };
};

  const columns = useMemo(
    () => [
      columnHelper.accessor("productName", {
        header: "상품명",

        meta: {
          flex: 4,
        },

        cell: ({ row }) => (
          <div className={styles.productNameArea}>
            <div className={styles.imageWrapper}>
              <Image
                fill
                src={row.original.productImage}
                alt={row.original.productName}
              />
            </div>

            <div>
              <p>{row.original.productName}</p>
              <p>{row.original.optionText || "기본옵션"}</p>
            </div>
          </div>
        ),
      }),

      columnHelper.accessor("quantity", {
        header: "수량",

        meta: {
          flex: 1,
        },

        cell: ({ getValue }) => (
          <p className={styles.tableRow}>{getValue()}개</p>
        ),
      }),

      columnHelper.accessor("unitPrice", {
        header: "상품금액",

        meta: {
          flex: 1.5,
        },

        cell: ({ row }) => {
          const discount = getDiscountInfo(
            row.original.originalPrice,
            row.original.unitPrice,
          );

          return (
            <div className={styles.priceArea}>
              {discount ? (
                <>
                  <del className={styles.originalPrice}>
                    {discount.originalPrice.toLocaleString()}원
                  </del>

                  <div className={styles.saleRow}>
                    <p className={styles.salePrice}>
                      {discount.price.toLocaleString()}원
                    </p>

                    <span className={styles.discountRate}>
                      {discount.discountRate}%
                    </span>
                  </div>
                </>
              ) : (
                <p className={styles.salePrice}>
                  {row.original.unitPrice.toLocaleString()}원
                </p>
              )}
            </div>
          );
        },
      }),

      columnHelper.accessor("totalPrice", {
        header: "합계금액",

        meta: {
          flex: 1.5,
        },

        cell: ({ row }) => (
          <p className={styles.totalPrice}>
            {(row.original.unitPrice * row.original.quantity).toLocaleString()}
            원
          </p>
        ),
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: cartItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const newOrderNumber = useMemo(() => {
    const today = new Date();

    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const dateStr = `${mm}${dd}`;

    return `HS-${dateStr}-${Date.now().toString().slice(-5)}`;
  }, [user.id]);

  const onSubmit = async (data: GuestOrderFormData) => {
    try {
      const createOrderRes = await fetch("/api/order/temp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          orderNumber: newOrderNumber,
          userId: user.id,
          items: cartItems,
          total: totalOrderPrice + (isFreeDelivery ? 0 : 3000),
        }),
      });

      if (!createOrderRes.ok) {
        const errorData = await createOrderRes.json();

        throw new Error(errorData.message || "주문 생성 실패");
      }

      if (!createOrderRes.ok) throw new Error("주문 생성 실패");

      const { orderNumber } = await createOrderRes.json();

      // 토스페이먼츠
      const clientKey = "test_ck_5OWRapdA8db6wDXjmM7bVo1zEqZK";
      const tossPayments = await loadTossPayments(clientKey);

      const paymentConfig = {
        amount: totalOrderPrice + (isFreeDelivery ? 0 : 3000),
        orderId: orderNumber,
        orderName:
          cartItems.length > 1
            ? `${cartItems[0].productName} 외 ${cartItems.length - 1}건`
            : cartItems[0].productName,
        customerName: data.name,
        customerEmail: data.email,
        successUrl: `${window.location.origin}/order/success?orderNumber=${orderNumber}`,
        failUrl: `${window.location.origin}/order/fail`,
      };

      if (data.paymentMethod === "kakaoPay") {
        await tossPayments.requestPayment("카카오페이" as any, paymentConfig);
      } else if (data.paymentMethod === "naverPay") {
        await tossPayments.requestPayment("네이버페이" as any, paymentConfig);
      } else if (data.paymentMethod === "bank") {
        await tossPayments.requestPayment("계좌이체", paymentConfig);
      } else {
        await tossPayments.requestPayment("카드", paymentConfig);
      }
    } catch (error) {
      console.error(error);
      toast.error("결제가 취소되었습니다.");
    }
  };

  // 반응형
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className={styles.inner}>
      <Script
        src="https://cdn.iamport.kr/v1/iamport.js"
        strategy="lazyOnload"
      />
      ;
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              width: "500px",
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <DaumPostcodeEmbed onComplete={handleComplete} />

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{ marginTop: "10px" }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit, (errors) =>
          console.log("유효성 검사 실패:", errors),
        )}
      >
        <header className={styles.SectionHeader}>
          <h1>주문서 작성/결제</h1>

          <BreadCrumb steps={STEPS} />
        </header>

        <section className={styles.productListArea}>
          <h2>주문상품</h2>

          <div className={styles.desktopTable}>
            <UnifiedTable table={table} className={styles.table} />
          </div>

          <div className={styles.mobileCardList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.mobileCard}>
                <div className={styles.mobileTop}>
                  <div className={styles.mobileImage}>
                    <Image
                      fill
                      src={item.productImage}
                      alt={item.productName}
                    />
                  </div>

                  <div className={styles.mobileInfo}>
                    <p className={styles.mobileName}>{item.productName}</p>

                    <p className={styles.mobileOption}>
                      {item.optionText || "기본옵션"}
                    </p>
                  </div>
                </div>

                <div className={styles.mobileBottom}>
                  <div>
                    <span>상품금액</span>
                    <p>{item.unitPrice.toLocaleString()}원</p>
                  </div>

                  <div>
                    <span>수량</span>
                    <p>{item.quantity}개</p>
                  </div>

                  <div>
                    <span>합계</span>
                    <p className={styles.totalPrice}>
                      {(item.unitPrice * item.quantity).toLocaleString()}원
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 주문제작 상품 있을 때 */}
        {hasCustomItem && (
          <fieldset className={styles.customRequestArea}>
            <legend>주문제작 요청사항</legend>

            <div className={styles.infoBox}>
              <p className={styles.infoTitle}>
                주문하신 상품 중 <b>주문제작 상품</b>이 포함되어 있습니다.
              </p>
              <div className={styles.exampleBox}>
                <p>
                  <strong>작성 예시:</strong>
                </p>
                <ul>
                  <li>
                    검정띠 160호 - 이름 '홍길동' / 한문자수 / 오른쪽 끝 위치
                  </li>
                  <li>
                    도복 상의 - 왼쪽 가슴 'XX태권도' 로고 인쇄 (파일 첨부)
                  </li>
                </ul>
              </div>
              <p className={styles.notice}>
                ※ 시안 확인 없이 적어주신 내용대로 즉시 제작되므로 신중하게 작성
                부탁드립니다.
              </p>
            </div>

            <div className={styles.textAreaRow}>
              <textarea
                {...register("customRequest")}
                placeholder="자수 문구, 로고 위치 등 상세 내용을 자유롭게 적어주세요. 상품이 여러 개인 경우 상품별로 구분해서 적어주시면 좋습니다."
                rows={5}
              />
              {errors.customRequest && (
                <p className={styles.error}>{errors.customRequest.message}</p>
              )}
            </div>

            {/* 로고 파일 업로드 */}
            <div className={styles.fileUploadRow}>
              <label htmlFor="customFiles">로고/시안 파일 첨부 (선택)</label>
              <div className={styles.fileInputWrapper}>
                <input
                  type="file"
                  id="customFiles"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <Button
                  type="button"
                  variant="black"
                  onClick={() =>
                    document.getElementById("customFiles")?.click()
                  }
                >
                  파일 선택하기
                </Button>

                {imagePreview && (
                  <div className={styles.previewList}>
                    <div className={styles.previewItem}>
                      <img
                        src={imagePreview}
                        alt="미리보기"
                        className={styles.miniPreview}
                      />
                      <span className={styles.fileName}>
                        이미지가 선택되었습니다.
                      </span>
                      <button
                        type="button"
                        className={styles.deleteFileBtn}
                        onClick={() => {
                          setImagePreview(null);
                          setValue("customFiles", null);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <p className={styles.fileGuide}>
                * 로고 자수나 인쇄가 필요한 경우 고화질 이미지를 첨부해주세요.
              </p>
            </div>
          </fieldset>
        )}

        {/* 주문자정보 */}
        <fieldset className={styles.ordererInfoArea}>
          <legend>주문자 정보</legend>

          <div className={styles.inputRow}>
            <div>
              <label htmlFor="name">이름</label>

              <p>{user.name}</p>
            </div>

            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.inputRow}>
            <div>
              <label htmlFor="email">이메일 주소</label>

              <p>{user.email}</p>
            </div>

            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.inputRow}>
            <div>
              <label htmlFor="phone">휴대전화</label>

              <p>{user.phone}</p>
            </div>

            {errors.phone && (
              <span className={styles.error}>{errors.phone.message}</span>
            )}
          </div>

          <div className={styles.inputRow}>
            <div>
              <label htmlFor="phone">기본 주소</label>

              <p>{user.address.address}</p>
              <p>{user.address.detailAddress}</p>
            </div>

            {errors.phone && (
              <span className={styles.error}>{errors.phone.message}</span>
            )}
          </div>
        </fieldset>

        {/* 배송지정보 */}
        <fieldset className={styles.shippingArea}>
          <div className={styles.shippingHeader}>
            <legend>배송지 정보</legend>

            <div className={styles.sameCheck}>
              <input
                type="checkbox"
                id="same-as-orderer"
                checked={isSameAsOrderer}
                onChange={(e) => handleSameAsOrderer(e.target.checked)}
              />
              <label htmlFor="same-as-orderer">주문자 정보와 동일</label>
            </div>
          </div>

          <div className={styles.inputRow}>
            <div>
              <label htmlFor="receiverName">받는 분</label>

              <input
                {...register("receiverName")}
                placeholder="이름을 입력하세요"
              />
            </div>

            {errors.receiverName && (
              <p className={styles.error}>{errors.receiverName.message}</p>
            )}
          </div>

          <div className={styles.addressArea}>
            <div className={styles.addressHeader}>
              <div>
                <label>주소</label>
              </div>

              <div className={styles.addressGroup}>
                <div>
                  <div className={styles.postWrapper}>
                    <input
                      {...register("postcode")}
                      placeholder="우편번호"
                      readOnly
                    />

                    <Button
                      type="button"
                      variant="black"
                      onClick={() => setIsOpen(true)}
                    >
                      우편번호 찾기
                    </Button>
                  </div>

                  {errors.postcode && (
                    <p className={styles.error}>{errors.postcode.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register("address")}
                    placeholder="기본 주소"
                    readOnly
                  />

                  {errors.address && (
                    <p className={styles.error}>{errors.address.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register("detailAddress")}
                    placeholder="상세 주소"
                  />

                  {errors.detailAddress && (
                    <p className={styles.error}>
                      {errors.detailAddress.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.phoneArea}>
            <div>
              <label htmlFor="cellphone">휴대전화</label>
              <input {...register("cellphone")} placeholder="010-0000-0000" />
            </div>

            {errors.cellphone && (
              <p className={styles.error}>{errors.cellphone.message}</p>
            )}
          </div>

          <div className={styles.deiliveryMessageArea}>
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
          </div>
        </fieldset>

        {/* 결제 정보 */}
        <section className={styles.payArea}>
          <fieldset>
            <legend>결제 정보</legend>

            <dl>
              <div className={styles.summaryRow}>
                <dt>주문 상품</dt>
                <dd>{totalOrderPrice.toLocaleString()}원</dd>
              </div>

              <div className={styles.summaryRow}>
                <dt>배송비</dt>
                <dd>{isFreeDelivery ? "0원" : "3,000원"}</dd>
              </div>

              <div className={styles.summaryRow}>
                <dt>최종 결제 금액</dt>
                <dd>
                  {(
                    totalOrderPrice + (isFreeDelivery ? 0 : 3000)
                  ).toLocaleString()}
                  원
                </dd>
              </div>
            </dl>
          </fieldset>
        </section>

        <section className={styles.paymentMethodArea}>
          <fieldset>
            <legend>결제 수단 선택</legend>

            <div>
              <label htmlFor="card">
                <input
                  id="card"
                  type="radio"
                  {...register("paymentMethod")}
                  value="card"
                />
                신용카드
              </label>

              <label htmlFor="bank">
                <input
                  id="bank"
                  type="radio"
                  {...register("paymentMethod")}
                  value="bank"
                />
                계좌이체
              </label>

              <label htmlFor="kakaoPay" className="payment-option">
                <input
                  type="radio"
                  id="kakaoPay"
                  {...register("paymentMethod")}
                  value="kakaoPay"
                />
                <Image
                  src="/image/kakao_CI_logotype 1.png"
                  alt="kakaoPay"
                  fill
                />
              </label>

              <label htmlFor="naverPay" className="payment-option">
                <input
                  type="radio"
                  id="naverPay"
                  {...register("paymentMethod")}
                  value="naverPay"
                />
                <Image
                  src="/image/NAVER NPAY LOGO_003 1.png"
                  width={92}
                  height={34}
                  alt="naverPay"
                />
              </label>
            </div>
          </fieldset>
        </section>

        <section className={styles.termsArea}>
          <div>
            <input
              type="checkbox"
              id="order-agree"
              {...register("orderAgree")}
            />
            <label htmlFor="order-agree">
              결제 정보를 확인하였으며, 구매 진행에 동의합니다.
            </label>
          </div>

          {errors.orderAgree && (
            <p className={styles.error}>{errors.orderAgree.message}</p>
          )}
          <Button type={"submit"} variant="primary">
            결제하기
          </Button>
        </section>
      </form>
    </div>
  );
}
