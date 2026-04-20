"use client";
import { Table } from "@/components/Table/page";
import styles from "./CartList.module.scss";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { customConfirm } from "@/lib/swal";
import Button from "@/components/common/buttons/page";
import { useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { X } from "lucide-react";
import { UnifiedTable } from "@/components/common/DataTable";

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
  optionName?: string;
  option?: string;
  color?: string;
  size?: string;
  isCustomizable: boolean;
}

interface Props {
  user: any;
  cart: any[];
  isLoading: boolean;
  refetch: () => void;
}

const STEPS = [
  { label: "장바구니", step: 0, path: "/cart" },
  { label: "주문서작성/결제", step: 1, path: "/checkout" },
  { label: "주문완료", step: 2, path: "/order/success" },
];

export default function CartListComponent({
  user,
  cart,
  isLoading,
  refetch,
}: Props) {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const router = useRouter();
  const queryClient = useQueryClient();
  console.log(cart);
  const tableData: UnifiedCartItem[] = useMemo(() => {
    return cart.map((item, index) => {
      const displayOption =
        item.optionDisplay ||
        item.productOption?.name ||
        (item.color || item.size ? `${item.color} ${item.size}`.trim() : "");

      // 고유 ID 결정 로직
      const uniqueId =
        item.id ||
        item.cartItemId ||
        item.productOptionId ||
        item.productId ||
        index;

      return {
        id: uniqueId,
        productId: item.productId || item.product?.id,
        productOptionId: item.productOptionId,
        productName: item.productName || item.product?.name || "상품 정보 없음",
        thumbnail:
          item.thumbnail || item.product?.thumbnail || "/image/default.png",
        price: item.price || item.product?.price || 0,
        quantity: item.quantity || 0,
        optionName: item.optionName || displayOption || "옵션 없음", // 이 부분 확인
        option: displayOption,
        isCustomizable:
          item.isCustomizable || item.product?.isCustomizable || false,
      };
    });
  }, [cart]);

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (checkedItems.length === tableData.length) {
      setCheckedItems([]);
    } else {
      setCheckedItems(tableData.map((item) => item.id));
    }
  };

  const afterDelete = () => {
    if (user) {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } else {
      refetch();
    }
  };

  const removeItem = async (id: number) => {
    const result = await customConfirm({
      title: "상품을 삭제하시겠습니까?",
      confirmText: "삭제",
      isDanger: true,
    });
    if (!result.isConfirmed) return;

    try {
      if (user) {
        const res = await fetch(`/api/cart?ids=${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error();
      } else {
        const updatedCart = cart.filter(
          (item) => (item.id || item.productOptionId || item.productId) !== id,
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      afterDelete();
      toast.success("상품이 삭제되었습니다.");
    } catch (error) {
      toast.error("삭제 실패");
    }
  };

  const removeSelected = async () => {
    if (checkedItems.length === 0)
      return toast.error("삭제할 상품을 선택해주세요.");
    const result = await customConfirm({
      title: "선택 삭제",
      text: `총 ${checkedItems.length}개를 삭제하시겠습니까?`,
      confirmText: "삭제",
      isDanger: true,
    });
    if (!result.isConfirmed) return;

    try {
      if (user) {
        const res = await fetch(`/api/cart?ids=${checkedItems.join(",")}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error();
      } else {
        const updatedCart = cart.filter(
          (item) =>
            !checkedItems.includes(
              item.id || item.productOptionId || item.productId,
            ),
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      afterDelete();
      setCheckedItems([]);
      toast.success("삭제 완료");
    } catch (error) {
      toast.error("삭제 실패");
    }
  };

  const removeAll = async () => {
    const result = await customConfirm({
      title: "장바구니를 비우시겠습니까?",
      confirmText: "전체 삭제",
      isDanger: true,
    });

    if (!result.isConfirmed) return;

    try {
      if (user) {
        const res = await fetch("/api/cart?type=all", { method: "DELETE" });
        if (!res.ok) throw new Error();
      } else {
        localStorage.removeItem("cart");
      }

      afterDelete();
      setCheckedItems([]);
      toast.success("장바구니가 비워졌습니다.");
    } catch (error) {
      toast.error("전체 삭제 실패");
    }
  };

  const columnHelper = createColumnHelper<UnifiedCartItem>();

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        size: 40,
        header: () => (
          <input
            type="checkbox"
            checked={
              tableData.length > 0 && checkedItems.length === tableData.length
            }
            onChange={toggleAll}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={checkedItems.includes(row.original.id)}
            onChange={() => toggleCheck(row.original.id)}
          />
        ),
      }),
      columnHelper.accessor("productName", {
        header: "상품명",
        size: 440,
        cell: ({ row }) => (
          <div
            className={styles.productNameArea}
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <div
              className={styles.thumb}
              style={{
                position: "relative",
                width: "90px",
                height: "90px",
                flexShrink: 0,
              }}
            >
              <Image
                src={row.original.thumbnail}
                fill
                alt="thumb"
                style={{ objectFit: "cover", borderRadius: "4px" }}
              />
            </div>
            <div
              className={styles.infoText}
              style={{ textAlign: "left", overflow: "hidden" }}
            >
              <p style={{ fontWeight: 700, margin: "0 0 4px 0" }}>
                {row.original.productName}
              </p>

              {row.original.optionName &&
                row.original.optionName !== "옵션 없음" && (
                  <span style={{ color: "#888", fontSize: "13px" }}>
                    [옵션] {row.original.optionName}
                  </span>
                )}
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("quantity", {
        header: "수량",
        size: 80,
        cell: (info) => <span>{info.getValue()}개</span>,
      }),
      columnHelper.accessor("price", {
        header: "상품금액",
        size: 150,
        cell: (info) => (
          <span style={{ fontWeight: 600 }}>
            {info.getValue().toLocaleString()}원
          </span>
        ),
      }),
      columnHelper.display({
        id: "delete",
        header: "삭제",
        size: 60,
        cell: ({ row }) => (
          <button
            onClick={() => removeItem(row.original.id)}
            className={styles.deleteBtn}
          >
            <X size={18} color="#999" />
          </button>
        ),
      }),
    ],
    [checkedItems, tableData],
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const selectedItemsData = tableData.filter((item) =>
    checkedItems.includes(item.id),
  );
  const totalProductPrice = selectedItemsData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shippingFee =
    totalProductPrice >= 50000 || totalProductPrice === 0 ? 0 : 3000;
  const totalPayment = totalProductPrice + shippingFee;

  // 주문 이동
  const goToCheckout = (all: boolean) => {
    const itemsToOrder = all ? tableData : selectedItemsData;
    if (itemsToOrder.length === 0)
      return toast.error("주문할 상품을 선택해주세요.");

    if (!user) {
      localStorage.setItem("checkoutItems", JSON.stringify(itemsToOrder));
    }
    router.push("/checkout");
  };

  return (
    <>
      <div className={styles.container}>
        {isLoading ? (
          <table className={styles.cartTable}>
            <thead>
              <tr>
                <th style={{ width: "40px" }}>
                  <input type="checkbox" disabled />
                </th>
                <th style={{ width: "440px" }}>상품명</th>
                <th style={{ width: "80px" }}>수량</th>
                <th style={{ width: "150px" }}>상품금액</th>
                <th style={{ width: "60px" }}>삭제</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </tbody>
          </table>
        ) : (
          <UnifiedTable table={table} className={styles.cartTable} />
        )}
      </div>

      <div className={styles.cartActions}>
        <Button variant="edit" onClick={removeSelected}>
          선택 삭제
        </Button>

        <Button variant="delete" onClick={removeAll}>
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

//스켈레톤
const SkeletonRow = () => (
  <tr className={styles.skeletonRow}>
    <td>
      <div className={styles.delCircle} style={{ width: "20px" }} />
    </td>

    <td>
      <div className={styles.productNameArea}>
        <div className={styles.thumb} />
        <div className={styles.infoText}>
          <div className={styles.nameLine} />
          <div className={styles.optLine} />
        </div>
      </div>
    </td>
    <td>
      <div className={styles.qtyLine} />
    </td>
    <td>
      <div className={styles.priceLine} />
    </td>
    <td>
      <div className={styles.delCircle} />
    </td>
  </tr>
);
