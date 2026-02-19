"use client";
import { Table } from "@/components/Table/page";
import styled from "@emotion/styled";
import Image from "next/image";

export interface Column<T> {
  key: keyof T;
  label: string;
  width?: string;
  flex?: number;
  align?: "left" | "center" | "right";
  render?: (row: T) => React.ReactNode;
}

type TableCartItem = Pick<
  CartItem,
  "id" | "name" | "img" | "price" | "quantity"
>;

interface CartItem {
  id: number;
  name: string;
  img: string;
  option?: string;
  price: number;
  quantity: number;
  close?: boolean;
}

interface ApiCartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
}

interface Props {
  cart: ApiCartItem[];
  setCart: React.Dispatch<React.SetStateAction<ApiCartItem[]>>;
}

export const CartSummary = styled.section`
  > div:first-of-type {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 30px 0 25px;

    p {
      font-size: 18px;
      strong {
        font-weight: 700;
        margin-left: 10px;
      }
    }

    span {
      display: inline-block;
      margin: 0 5px;

      &:first-of-type {
        background: url("/image/ic_baseline-plus.png") no-repeat center;
        background-size: cover;
        width: 24px;
        height: 24px;
      }

      &:nth-of-type(2) {
        background: url("/image/material-symbols_equal.png") no-repeat center;
        background-size: cover;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 13px;

  button {
    &:first-of-type {
      border: 1px solid #888;
      border-radius: 4px;
      width: 130px;
      height: 45px;
    }
    &:last-of-type {
      background-color: #1e40af;
      color: white;
      border-radius: 4px;
      width: 130px;
      height: 45px;
    }
  }
`;

export default function CartListComponent({ cart, setCart }: Props) {
  // 선택한 아이템 삭제
  const removeItem = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);

    setCart(updatedCart);
    localStorage.setItem("guestCart", JSON.stringify(updatedCart));
  };

  // 모든 장바구니 아이템 삭제
  const removeall = () => {
    alert("장바구니를 비웠습니다");

    setCart([]);
    localStorage.removeItem("guestCart");
  };

  const cartColumns: Column<TableCartItem>[] = [
    {
      key: "check",
      label: (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input type="checkbox" style={{ width: "20px", height: "20px" }} />
        </div>
      ),
      flex: 0.4,
      render: () => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input type="checkbox" style={{ width: "20px", height: "20px" }} />
        </div>
      ),
    },
    {
      key: "name",
      label: "상품명",
      flex: 3.5,
      render: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "25px",
            width: "100%", // 중요! Info의 flex-center 폭 다 차지
          }}
        >
          <Image
            src={row.img}
            width={90}
            height={90}
            alt="상품 이미지"
            style={{ backgroundColor: "#D9D9D9" }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <span style={{ fontWeight: 700 }}>{row.name}</span>
            {row.option && (
              <span style={{ marginTop: 8, color: "#888", fontSize: 15 }}>
                {row.option}
              </span>
            )}
          </div>
        </div>
      ),
    },

    {
      key: "quantity",
      label: "수량",
      flex: 1.5,
      render: (row) => (
        <span style={{ display: "flex" }}>{row.quantity}개</span>
      ),
    },
    {
      key: "price",
      label: "상품금액",
      flex: 1.2,
      render: (row) => (
        <span style={{ display: "flex", justifyContent: "center" }}>
          {row.price.toLocaleString()}원
        </span>
      ),
    },
    {
      key: "close",
      label: (
        <Image
          alt={"전체삭제"}
          src={"/image/meteor-icons_xmark.png"}
          width={20}
          height={20}
          style={{ display: "flex", justifyContent: "center" }}
          onClick={removeall}
        />
      ),
      flex: 0.5,
      render: (row) => (
        <Image
          alt={"삭제"}
          src={"/image/meteor-icons_xmark.png"}
          width={20}
          height={20}
          style={{ display: "flex", justifyContent: "center" }}
          onClick={() => {
            removeItem(row.id);
          }}
        />
      ),
    },
  ];
  const tableData = cart.map((item) => ({
    id: item.id,
    name: item.product.name,
    img: "/img/default.png", // 나중에 product.image 넣으면 됨
    price: item.product.price,
    quantity: item.quantity,
  }));

  const totalProductPrice = tableData.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const shippingFee = totalProductPrice >= 50000 ? 0 : 3000;

  const totalPayment = totalProductPrice + shippingFee;

  return (
    <>
      <Table columns={cartColumns} data={tableData} />

      <CartSummary>
        <div>
          <p>
            총 상품금액 <strong>{totalProductPrice.toLocaleString()}</strong>원
          </p>
          <span />
          <p>
            배송비 <strong>{shippingFee.toLocaleString()}</strong>원
          </p>
          <span />
          <p>
            총 결제금액 <strong>{totalPayment.toLocaleString()}</strong>원
          </p>
        </div>

        <Buttons>
          <button>선택 상품 주문</button>
          <button>전체 상품 주문</button>
        </Buttons>
      </CartSummary>
    </>
  );
}
