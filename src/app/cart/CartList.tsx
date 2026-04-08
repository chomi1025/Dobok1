"use client";
import { Table } from "@/components/Table/page";
import styles from "./CartList.module.scss";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { customConfirm } from "@/lib/swal";
import Button from "@/components/common/buttons/page";
import CartEmptyComponent from "./CartEmpty";

interface Column<T> {
  key: keyof T | string;
  label: React.ReactNode;
  width?: string;
  flex?: number;
  align?: "left" | "center" | "right";
  render?: (row: T) => React.ReactNode;
}

interface UnifiedCartItem {
  id: number;
  productId: number;
  productOptionId?: number;
  productName: string;
  thumbnail: string;
  price: number;
  quantity: number;
  option?: string;
  color?: string;
  size?: string;
  isCustomizable: boolean;
}

interface Props {
  user: any;
  cart: any[];
  isLoading: boolean;
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function CartListComponent({
  user,
  cart,
  isLoading,
  setCart,
}: Props) {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const router = useRouter();

  const toggleCheck = (productId: number) => {
    setCheckedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  // 개별삭제
  const removeItem = async (id: number) => {
    console.log("삭제 버튼 클릭됨! ID:", id);
    console.log("전달받은 user 객체 상태:", user);

    if (!id) return;

    const result = await customConfirm({
      title: "상품을 삭제하시겠습니까?",
      confirmText: "삭제",
      isDanger: true,
    });

    if (result.isConfirmed) {
      try {
        if (user) {
          const res = await fetch(`/api/cart?ids=${id}`, { method: "DELETE" });

          if (!res.ok) throw new Error("삭제 실패");
          setCart((prev) => prev.filter((item) => item.id !== id));
        } else {
          const updatedCart = cart.filter(
            (item) => (item.productOptionId || item.productId) !== id,
          );
          setCart(updatedCart);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        toast.success("상품이 삭제되었습니다.");
      } catch (error) {
        console.log(error);
        toast.error("삭제에 실패했습니다.");
      }
    }
  };

  // 전체삭제
  const removeall = async () => {
    const result = await customConfirm({
      title: "장바구니를 비우시겠습니까?",
      text: "장바구니의 모든 상품이 삭제됩니다.",
      confirmText: "삭제",
      isDanger: true,
    });

    if (result.isConfirmed) {
      try {
        if (user) {
          const res = await fetch("/api/cart?type=all", { method: "DELETE" });
          if (!res.ok) throw new Error("전체 삭제 실패");
        }

        setCart([]);
        localStorage.removeItem("cart");

        toast.success("장바구니가 비워졌습니다.");
      } catch (error) {
        console.error("전체 삭제 중 에러:", error);
      }
    }
  };

  // 선택삭제
  const removeSelected = async () => {
    if (checkedItems.length === 0) {
      return toast.error("삭제할 상품을 선택해주세요.");
    }

    const result = await customConfirm({
      title: "선택한 상품을 삭제하시겠습니까?",
      text: `총 ${checkedItems.length}개의 상품이 삭제됩니다.`,
      confirmText: "선택 삭제",
      isDanger: true,
    });

    if (result.isConfirmed) {
      try {
        if (user) {
          const idsString = checkedItems.join(",");

          const res = await fetch(`/api/cart?ids=${idsString}`, {
            method: "DELETE",
          });

          if (!res.ok) throw new Error("선택 삭제 실패");

          setCart((prev) =>
            prev.filter((item) => !checkedItems.includes(item.id)),
          );
        } else {
          const updatedCart = cart.filter(
            (item) =>
              !checkedItems.includes(item.productOptionId || item.productId),
          );
          setCart(updatedCart);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }

        setCheckedItems([]);
        toast.success("선택한 상품이 모두 삭제되었습니다.");
      } catch (error) {
        console.error("선택 삭제 실패:", error);
        toast.error("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const cartColumns: Column<UnifiedCartItem>[] = [
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
      key: "productName",
      label: "상품명",
      flex: 3.5,
      render: (row) => (
        <div className={styles.productNameArea}>
          <div>
            <Image src={row.thumbnail} fill alt="상품 이미지" />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <span style={{ fontWeight: 700 }}>{row.productName}</span>
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
        <button
          type="button"
          onClick={() => {
            removeItem(row.id);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title="상품 삭제"
        >
          <Image
            alt={"장바구니 상품 개별삭제"}
            src={"/image/meteor-icons_xmark.png"}
            width={10}
            height={10}
            style={{
              objectFit: "cover",
            }}
          />
        </button>
      ),
    },
  ];

  const tableData: UnifiedCartItem[] = cart.map((item) => {
    const displayOption =
      item.optionDisplay ||
      item.productOption?.name ||
      (item.color || item.size ? `${item.color} ${item.size}`.trim() : "");

    const baseItem = {
      productId: item.productId || item.product?.id,
      productName: item.productName || item.product?.name || "상품 정보 없음",
      thumbnail:
        item.thumbnail || item.product?.thumbnail || "/image/default.png",
      price: item.price || item.product?.price || 0,
      quantity: item.quantity || 0,
      option: displayOption,
      isCustomizable:
        item.isCustomizable || item.product?.isCustomizable || false,
    };

    if (item.product) {
      return {
        ...baseItem,
        id: item.id || item.productOptionId || item.productId,
      };
    }

    // 비회원
    return {
      ...baseItem,
      id: item.productOptionId || item.productId,
      color: item.color,
      size: item.size,
    };
  });

  const totalProductPrice = tableData.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const shippingFee = totalProductPrice >= 50000 ? 0 : 3000;

  const totalPayment = totalProductPrice + shippingFee;

  // 주문페이지로 이동 ㄱㄱ
  const goToCheckout = (all: boolean) => {
    try {
      if (cart.length === 0) {
        return toast.error("장바구니에 담긴 상품이 없습니다.");
      }

      const selectedItems = all
        ? cart
        : cart.filter((item) => checkedItems.includes(item.id));

      if (!selectedItems || selectedItems.length === 0) {
        return toast.error(
          all ? "장바구니가 비어있습니다." : "주문할 상품을 선택해주세요.",
        );
      }

      if (user) {
        router.push(`/checkout`);
      } else {
        localStorage.setItem("checkoutItems", JSON.stringify(selectedItems));
        router.push("/checkout");
      }
    } catch (error) {
      console.log(error);
      toast.error("주문 페이지 이동 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Table columns={cartColumns} data={tableData} isLoading={isLoading} />

      <div className={styles.cartActions}>
        <Button variant="edit" onClick={removeSelected}>
          선택 삭제
        </Button>

        <Button variant="delete" onClick={removeall}>
          장바구니 비우기
        </Button>
      </div>

      <section className={styles.cartSummary}>
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

        <div className={styles.buttonsArea}>
          <Button variant="edit" onClick={() => goToCheckout(false)}>
            선택 상품 주문
          </Button>

          <Button onClick={() => goToCheckout(true)}>전체 상품 주문</Button>
        </div>
      </section>
    </>
  );
}
