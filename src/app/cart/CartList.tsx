"use client";

import styles from "./CartList.module.scss";
import Image from "next/image";
import React, { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { customConfirm } from "@/lib/swal";
import Button from "@/components/common/buttons/page";
import { useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { UnifiedTable } from "@/components/common/DataTable";
import { X } from "lucide-react";

interface UnifiedCartItem {
  id: string;
  productId: number;
  productOptionId?: number;
  productName: string;
  thumbnail: string;
  price: number;
  originPrice: number;
  quantity: number;
  optionName?: string;
  option?: string;
  optionName2?: string;
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

const columnHelper = createColumnHelper<UnifiedCartItem>();

const Checkbox = React.memo(
  ({ checked, onChange }: { checked: boolean; onChange: () => void }) => {
    return <input type="checkbox" checked={checked} onChange={onChange} />;
  },
);

export default function CartListComponent({
  user,
  cart,
  isLoading,
  refetch,
}: Props) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const router = useRouter();
  const queryClient = useQueryClient();
  const getDiscountRate = (origin: number, final: number) => {
    if (!origin || origin <= final) return 0;

    return Math.round(((origin - final) / origin) * 100);
  };

  const tableData: UnifiedCartItem[] = useMemo(() => {
    return cart.map((item, index) => {
      const displayOption = [
        item.optionName,
        item.optionValue,
        item.optionName2,
        item.optionValue2,
      ]
        .filter(Boolean)
        .join(" ");

      const uniqueId = String(
        item.id ||
          item.cartItemId ||
          item.productOptionId ||
          item.productId ||
          index,
      );

      return {
        id: uniqueId,
        productId: item.productId || item.product?.id,
        productOptionId: item.productOptionId,

        productName: item.productName || item.product?.name || "상품 정보 없음",

        thumbnail:
          item.thumbnail || item.product?.thumbnail || "/image/default.png",

        originPrice: item.originPrice || 0,
        price: item.finalPrice || 0,

        quantity: item.quantity || 0,

        optionName: item.optionName || displayOption || "옵션 없음",

        option: displayOption,

        isCustomizable:
          item.isCustomizable || item.product?.isCustomizable || false,
      };
    });
  }, [cart]);

  const toggleCheck = useCallback((id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }, []);
  const toggleAll = useCallback(() => {
    setCheckedItems((prev) => {
      if (prev.length === tableData.length) {
        return [];
      }

      return tableData.map((item) => item.id);
    });
  }, [tableData]);

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

  const isAllChecked = checkedItems.length === tableData.length;

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        meta: { flex: 0.5 },

        header: ({ table }) => {
          const meta = table.options.meta as CartMeta | undefined;

          return (
            <Checkbox
              checked={meta?.isAllChecked ?? false}
              onChange={() => meta?.toggleAll?.()}
            />
          );
        },

        cell: ({ row, table }) => {
          const meta = table.options.meta as CartMeta | undefined;

          return (
            <Checkbox
              checked={
                meta?.checkedItems?.includes(String(row.original.id)) ?? false
              }
              onChange={() => meta?.toggleCheck?.(String(row.original.id))}
            />
          );
        },
      }),

      columnHelper.accessor("productName", {
        header: "상품명",
        meta: { flex: 5 },

        cell: ({ row }) => (
          <div className={styles.productNameArea}>
            <div className={styles.imageWrapper}>
              <Image
                src={row.original.thumbnail}
                fill
                alt="thumb"
                sizes="90px"
                unoptimized
              />
            </div>

            <div className={styles.infoText}>
              <p className={styles.name}>{row.original.productName}</p>

              {row.original.optionName &&
                row.original.optionName !== "옵션 없음" && (
                  <span className={styles.option}>
                    [옵션] {row.original.optionName}
                  </span>
                )}
            </div>
          </div>
        ),
      }),

      columnHelper.accessor("quantity", {
        header: "수량",
        meta: { flex: 1 },

        cell: (info) => <span>{info.getValue()}개</span>,
      }),

      columnHelper.accessor("price", {
        header: "상품금액",
        meta: { flex: 2 },

        cell: ({ row }) => {
          const origin = row.original.originPrice;
          const final = row.original.price;

          const isDiscount = origin > final;
          const discountRate = getDiscountRate(origin, final);

          return (
            <div className={styles.priceArea}>
              {isDiscount && (
                <>
                  <p className={styles.originPrice}>
                    {origin.toLocaleString()}원
                  </p>

                  <div className={styles.finalRow}>
                    <strong className={styles.finalPrice}>
                      {final.toLocaleString()}
                      <span>원</span>
                    </strong>

                    <span className={styles.discountRate}>{discountRate}%</span>
                  </div>
                </>
              )}

              {!isDiscount && (
                <strong className={styles.finalPrice}>
                  {final.toLocaleString()}
                  <span>원</span>
                </strong>
              )}
            </div>
          );
        },
      }),

      columnHelper.display({
        id: "delete",
        header: "삭제",
        meta: { flex: 0.7 },

        cell: ({ row }) => (
          <button
            className={styles.deleteBtn}
            onClick={() => removeItem(Number(row.original.id))}
          >
            <X size={18} />
          </button>
        ),
      }),
    ],
    [],
  );

  type CartMeta = {
    checkedItems: string[];
    toggleCheck: (id: string) => void;
    isAllChecked: boolean;
    toggleAll: () => void;
  };

  const table = useReactTable<UnifiedCartItem>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      checkedItems,
      toggleCheck,
      isAllChecked,
      toggleAll,
    },
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
