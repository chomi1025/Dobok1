"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import PagenationComponent from "@/components/pagenation/page";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UnifiedTable } from "@/components/common/DataTable";
import Button from "@/components/common/buttons/page";
import toast from "react-hot-toast";
import { customConfirm } from "@/lib/swal";
import { PackagePlus } from "lucide-react";

const STATUS_LABEL = {
  ALL: "전체",
  ONSALE: "판매중",
  SOLDOUT: "품절",
  HIDDEN: "숨김",
};

const STATUS_MAP = {
  ONSALE: { color: "#2ecc71", label: "판매 중" },
  SOLDOUT: { color: "#e74c3c", label: "품절" },
  HIDDEN: { color: "#95a5a6", label: "숨김 처리" },
};

interface Category {
  id: string | number;
  name: string;
  parentId?: string | number | null;
}

interface CategoryWithChildren extends Category {
  children: Category[];
}

interface ProductType {
  id: number;
  name: string;
  description: string | null;
  thumbnail: string | null;
  images: string[];
  material: string | null;
  origin: string | null;
  createdAt: Date | string;
  categoryId: number;
  options: any[];
  category: any;
}

interface Props {
  products: ProductType[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  categories: CategoryWithChildren[];
}

const columnHelper = createColumnHelper<ProductType>();

export default function AdminProductClientPage({
  products,
  totalCount,
  currentPage,
  pageSize,
  categories,
}: Props) {
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    status: "ALL",
    mainId: "",
    subId: "",
    q: "",
  });

  const handleDelete = async (id: number, name: string) => {
    const result = await customConfirm({
      title: "상품 삭제",
      text: `상품을 정말 삭제하시겠습니까?\n신중하게 결정해주세요.`,
      confirmText: "삭제",
      cancelText: "취소",
      isDanger: true,
    });

    if (!result.isConfirmed) return;

    const loadingToast = toast.loading("상품을 삭제하고 있어요...");

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("상품이 삭제되었습니다.", { id: loadingToast });

        route.refresh();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "삭제에 실패했습니다.");
      }
    } catch (error: any) {
      toast.error(error.message, { id: loadingToast });
    }
  };

  useEffect(() => {
    setFilters({
      status: searchParams.get("status") || "ALL",
      mainId: searchParams.get("mainId") || "",
      subId: searchParams.get("subId") || "",
      q: searchParams.get("q") || "",
    });
  }, [searchParams]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "상품명",
        size: 350,
        cell: (info) => (
          <div
            className={styles.title}
            style={{ cursor: "pointer" }}
            onClick={() =>
              route.push(`/admin/products/${info.row.original.id}`)
            }
          >
            <Image
              width={60}
              height={60}
              src={info.row.original.thumbnail || "/no-image.png"}
              alt="상품 이미지"
              unoptimized
            />
            <span className={styles.titleText}>{info.getValue()}</span>
          </div>
        ),
      }),
      columnHelper.accessor("category", {
        header: "카테고리",
        size: 200,
        cell: (info) => {
          const category = info.getValue();
          if (!category)
            return <span className={styles.categoryText}>분류 없음</span>;

          const categoryName = category.parent
            ? `${category.parent.name} > ${category.name}`
            : category.name;

          return <span className={styles.categoryText}>{categoryName}</span>;
        },
      }),
      columnHelper.display({
        id: "price",
        header: "판매가",
        size: 100,
        cell: (info) => (
          <div className={styles.priceText}>
            {info.row.original.options?.[0]?.price?.toLocaleString()}원
          </div>
        ),
      }),
      columnHelper.display({
        id: "stock",
        header: "재고",
        size: 80,
        cell: (info) => {
          const totalStock = info.row.original.options?.reduce((acc, opt) => {
            return acc + (Number(opt.stock) || 0);
          }, 0);

          return (
            <div className={styles.stockText}>
              {totalStock?.toLocaleString() ?? 0}
            </div>
          );
        },
      }),
      columnHelper.accessor("options", {
        header: "상태",
        size: 80,
        cell: (info) => {
          const uniqueStatuses = Array.from(
            new Set(info.getValue()?.map((opt: any) => opt.status)),
          ) as Array<keyof typeof STATUS_MAP>;

          return (
            <div className={styles.statusContainer}>
              {uniqueStatuses.slice(0, 3).map((statusKey) => {
                const config = STATUS_MAP[statusKey];
                if (!config) return null;
                return (
                  <div
                    key={statusKey}
                    className={styles.statusWrapper}
                    data-tooltip={config.label}
                  >
                    <span
                      className={styles.statusCircle}
                      style={{ backgroundColor: config.color }}
                    />
                  </div>
                );
              })}
            </div>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "관리",
        size: 148,
        cell: (info) => (
          <div className={styles.actionButtons}>
            <button
              type="button"
              onClick={() =>
                route.push(`/admin/products/${info.row.original.id}`)
              }
              className={styles.editBtn}
            >
              수정
            </button>
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={() =>
                handleDelete(info.row.original.id, info.row.original.name)
              }
            >
              삭제
            </button>
          </div>
        ),
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFilters((prev) => {
      const nextFilters = { ...prev, [name]: value };

      if (name === "mainId") {
        nextFilters.subId = "";
      }

      return nextFilters;
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (filters.status !== "ALL") params.set("status", filters.status);
    if (filters.mainId) params.set("mainId", filters.mainId);
    if (filters.subId) params.set("subId", filters.subId);
    if (filters.q) params.set("q", filters.q);

    params.set("page", "1");

    route.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    setFilters({ status: "ALL", mainId: "", subId: "", q: "" });
    route.push(pathname);
  };

  return (
    <div className={styles.inner}>
      <form onSubmit={handleSearch}>
        <div className={styles.titleWrapper}>
          <h2>상품 관리</h2>
          <Button variant="black" href={`/admin/products/new`}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <PackagePlus size={18} />
              <span>상품 추가</span>
            </div>
          </Button>
        </div>

        <section className={styles.productFilter}>
          {/* 상태 필터 */}
          <div className={styles.filterStatus}>
            <h4>상태</h4>
            <ul>
              {Object.entries(STATUS_LABEL).map(([key, value]) => (
                <li key={key} className={styles.list}>
                  <button
                    type="button"
                    className={filters.status === key ? styles.active : ""}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, status: key }))
                    }
                  >
                    {value}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.filterGroup}>
            {/* 카테고리 필터 */}
            <div className={styles.filterCategoryStatus}>
              <h4>카테고리</h4>
              <div className={styles.selectBox}>
                <select
                  name="mainId"
                  value={filters.mainId}
                  onChange={handleChange}
                >
                  <option value="">대분류 전체</option>
                  {categories?.map((main) => (
                    <option key={main.id} value={main.id}>
                      {main.name}
                    </option>
                  ))}
                </select>

                {filters.mainId && (
                  <select
                    name="subId"
                    value={filters.subId}
                    onChange={handleChange}
                    style={{ marginLeft: "10px" }}
                  >
                    <option value="">소분류 전체</option>
                    {categories
                      .find((c) => String(c.id) === filters.mainId)
                      ?.children.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                  </select>
                )}
              </div>
            </div>

            {/* 검색어 필터 */}
            <div className={styles.searchInput}>
              <h4>검색</h4>
              <input
                type="text"
                name="q"
                value={filters.q}
                onChange={handleChange}
                placeholder="상품명 검색"
              />
            </div>

            <div className={styles.filterActions}>
              <Button className={styles.submitBtn} type="submit">
                검색
              </Button>
              <Button
                variant="edit"
                className={styles.resetBtn}
                onClick={handleReset}
              >
                초기화
              </Button>
            </div>
          </div>
        </section>

        <UnifiedTable table={table} className={styles.productTable} />

        <PagenationComponent
          total={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </form>
    </div>
  );
}
