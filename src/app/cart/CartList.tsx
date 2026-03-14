"use client";
import { Table } from "@/components/Table/page";
import styled from "@emotion/styled";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Column<T> {
  key: keyof T | string;
  label: React.ReactNode;
  width?: string;
  flex?: number;
  align?: "left" | "center" | "right";
  render?: (row: T) => React.ReactNode;
}

interface CartItem {
  id: number;
  name: string;
  img: string;
  option?: string;
  price: number;
  quantity: number;
  close?: boolean;
}

type TableCartItem = Pick<
  CartItem,
  "id" | "name" | "img" | "price" | "quantity" | "option"
>;

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
  const { data: session } = useSession();

  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const router = useRouter();

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedItems(cart.map((item) => Number(item.product.id)));
    } else {
      setCheckedItems([]);
    }
  };

  const toggleCheck = (productId: number) => {
    setCheckedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const isAllChecked = cart.length > 0 && checkedItems.length === cart.length;

  const removeItem = async (productId: number) => {
    try {
      if (session) {
        const result = await fetch(`/api/cart/${productId}`, {
          method: "DELETE",
        });

        if (!result.ok) {
          throw new Error("회원 장바구니 삭제 실패");
        }

        setCart(cart.filter((item) => item.id !== productId));
      } else {
        const updatedCart = cart.filter((item) => item.id !== productId);

        setCart(updatedCart);
        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeall = () => {
    alert("장바구니를 비웠습니다");

    setCart([]);
    localStorage.removeItem("guestCart");
  };

  const cartColumns: Column<TableCartItem>[] = [
    {
      key: "check",
      label: "선택",
      flex: 0.4,
      render: (row) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="checkbox"
            style={{ width: "20px", height: "20px" }}
            checked={checkedItems.includes(row.id)}
            onChange={() => toggleCheck(row.id)}
          />
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
            width: "100%",
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
      label: "삭제",
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
    id: item.product.id,
    name: item.product.name,
    img: "/img/default.png",
    price: item.product.price,
    quantity: item.quantity,
  }));

  const totalProductPrice = tableData.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const shippingFee = totalProductPrice >= 50000 ? 0 : 3000;

  const totalPayment = totalProductPrice + shippingFee;

  const goToCheckout = (all: boolean) => {
    try {
      const selectedItems = all
        ? cart
        : cart.filter((item) => checkedItems.includes(item.product.id));

      if (session) {
        const ids = selectedItems.map((item) => item.product.id).join(",");
        router.push(`/checkout?ids=${ids}`);
      } else {
        localStorage.setItem("checkoutItems", JSON.stringify(selectedItems));
        router.push("/checkout");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <button onClick={() => goToCheckout(false)}>선택 상품 주문</button>
          <button onClick={() => goToCheckout(true)}>전체 상품 주문</button>
        </Buttons>
      </CartSummary>
    </>
  );
}
