"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.scss";
import {
  Plus,
  Trash2,
  Edit2,
  ChevronRight,
  ChevronDown,
  Folder,
  Save,
} from "lucide-react";
import { Category } from "@prisma/client";
import Swal from "sweetalert2";
import { customConfirm } from "@/lib/swal";
import toast from "react-hot-toast";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

type CategoryWithChildren = Omit<Category, "id" | "parentId"> & {
  id: string;
  parentId: string | null;
  isVisible: boolean;
  children?: CategoryWithChildren[];
};

interface Props {
  initialCategories: CategoryWithChildren[];
}

function normalizeIds(list: CategoryWithChildren[]): CategoryWithChildren[] {
  return list.map((cat) => ({
    ...cat,
    id: String(cat.id),
    parentId: cat.parentId ? String(cat.parentId) : null,
    children: cat.children ? normalizeIds(cat.children) : [],
  }));
}

export default function CtegoryAdminPage({ initialCategories }: Props) {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState<CategoryWithChildren[]>(() =>
    normalizeIds(initialCategories),
  );
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryWithChildren | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isVisible, setIsVisible] = useState("true");
  const [parentId, setParentId] = useState<string | null>(null);

  const handleSelectCategory = (cat: CategoryWithChildren) => {
    setIsAddingNew(false);
    setSelectedCategory(cat);
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeItem = useMemo(() => {
    const found = categoryList.find((c) => String(c.id) === activeId);
    if (found) return found;

    for (const parent of categoryList) {
      const child = parent.children?.find((c) => String(c.id) === activeId);
      if (child) return child;
    }
    return undefined;
  }, [activeId, categoryList]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleAddNewMain = () => {
    setSelectedCategory(null);
    setIsAddingNew(true);
    setName("");
    setSlug("");
    setIsVisible("true");
    setParentId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoryData = {
      name,
      slug,
      isVisible: isVisible === "true",
      parentId: parentId,
    };

    try {
      if (isAddingNew) {
        const res = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryData),
        });

        if (!res.ok) throw new Error("등록에 실패했습니다.");
        const savedCategory = await res.json();

        if (!parentId) {
          setCategoryList((prev) => [
            ...prev,
            {
              ...savedCategory,
              id: String(savedCategory.id),
              parentId: null,
              children: [],
            },
          ]);
        } else {
          const updateChildrenRecursive = (
            list: CategoryWithChildren[],
          ): CategoryWithChildren[] => {
            return list.map((cat) => {
              if (String(cat.id) === String(parentId)) {
                return {
                  ...cat,
                  children: [
                    ...(cat.children || []),
                    {
                      ...savedCategory,
                      id: String(savedCategory.id),
                      parentId: String(savedCategory.parentId),
                      children: [],
                    },
                  ],
                };
              }
              if (cat.children && cat.children.length > 0) {
                return {
                  ...cat,
                  children: updateChildrenRecursive(cat.children),
                };
              }
              return cat;
            });
          };
          setCategoryList((prev) => updateChildrenRecursive(prev));
        }
        toast.success("새 카테고리가 등록되었습니다.");
      } else if (selectedCategory) {
        const res = await fetch(`/api/categories/${selectedCategory.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryData),
        });

        if (!res.ok) throw new Error("수정에 실패했습니다.");

        const updateRecursive = (
          list: CategoryWithChildren[],
        ): CategoryWithChildren[] => {
          return list.map((cat) => {
            if (cat.id === selectedCategory.id) {
              return { ...cat, ...categoryData };
            }
            if (cat.children)
              return { ...cat, children: updateRecursive(cat.children) };
            return cat;
          });
        };
        setCategoryList((prev) => updateRecursive(prev));
        toast.success("수정사항이 저장되었습니다.");
      }

      setIsAddingNew(false);
      setSelectedCategory(null);
      setParentId(null);
    } catch (error) {
      console.error("저장 중 에러:", error);
      toast.error("저장에 실패했습니다.");
    }
  };

  const handleAddSub = (parent: CategoryWithChildren) => {
    setSelectedCategory(null);
    setIsAddingNew(true);
    setName("");
    setSlug("");
    setIsVisible("true");
    setParentId(String(parent.id));
  };

  // 카테고리 삭제
  const removeFromList = (
    list: CategoryWithChildren[],
    targetId: string | number,
  ): CategoryWithChildren[] => {
    return list
      .filter((cat) => String(cat.id) !== String(targetId))
      .map((cat) => {
        if (cat.children && cat.children.length > 0) {
          return {
            ...cat,
            children: removeFromList(cat.children, targetId),
          };
        }
        return cat;
      });
  };

  const handleDeleteCategory = async (category: CategoryWithChildren) => {
    const result = await customConfirm({
      title: "정말 삭제하시겠습니까?",
      text: `[${category.name}] 카테고리를 삭제하면 복구할 수 없습니다.`,
      confirmText: "삭제",
      cancelText: "취소",
      isDanger: true,
    });

    if (!result.isConfirmed) return;

    try {
      const deleteRes = await fetch(`/api/categories/${category.id}`, {
        method: "DELETE",
      });

      if (!deleteRes.ok) {
        const data = await deleteRes.json();
        toast.error(data.error || "삭제에 실패했습니다.");
        return;
      }

      setCategoryList((prev) => removeFromList(prev, category.id));

      if (selectedCategory?.id === category.id) {
        setSelectedCategory(null);
      }

      toast.success("삭제가 완료되었습니다.");
    } catch (error) {
      console.error("삭제 중 에러:", error);
      Swal.fire("오류 발생", "서버와 통신 중 문제가 생겼어.", "error");
    }
  };

  const handleSaveOrder = async () => {
    try {
      const orderData: any[] = [];

      categoryList.forEach((parent, pIdx) => {
        orderData.push({ id: parent.id, sortOrder: pIdx + 1 });
        parent.children?.forEach((child, cIdx) => {
          orderData.push({ id: child.id, sortOrder: cIdx + 1 });
        });
      });

      const res = await fetch("/api/categories/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orders: orderData }),
      });

      if (!res.ok) throw new Error("순서 저장 실패");

      toast.success("카테고리 순서가 저장되었습니다.");

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("순서 저장 중 오류가 발생했습니다.");
    }
  };

  const getParentSlug = (
    list: CategoryWithChildren[],
    pId: string | null,
  ): string => {
    if (!pId) return "";
    const parent = list.find((c) => c.id === pId);
    return parent ? `${parent.slug}/` : "";
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    setCategoryList((prev) => {
      // =========================
      // 1차 카테고리 정렬
      // =========================
      const activeIndex = prev.findIndex((c) => String(c.id) === activeId);
      const overIndex = prev.findIndex((c) => String(c.id) === overId);

      if (activeIndex !== -1 && overIndex !== -1) {
        const reordered = arrayMove(prev, activeIndex, overIndex);

        return reordered.map((item, idx) => ({
          ...item,
          sortOrder: idx + 1,
        }));
      }

      // =========================
      // 2차 카테고리 정렬
      // =========================
      return prev.map((parent) => {
        if (!parent.children) return parent;

        const subActiveIdx = parent.children.findIndex(
          (c) => String(c.id) === activeId,
        );

        const subOverIdx = parent.children.findIndex(
          (c) => String(c.id) === overId,
        );

        if (subActiveIdx !== -1 && subOverIdx !== -1) {
          const reorderedChildren = arrayMove(
            parent.children,
            subActiveIdx,
            subOverIdx,
          ).map((child, idx) => ({
            ...child,
            sortOrder: idx + 1,
          }));

          return {
            ...parent,
            children: reorderedChildren,
          };
        }

        return parent;
      });
    });
  };

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name);
      setSlug(selectedCategory.slug || "");
      setIsVisible(String(selectedCategory.isVisible));
      setParentId(selectedCategory.parentId);
    }
  }, [selectedCategory]);

  const mainCategoryIds = useMemo(
    () =>
      categoryList
        .filter((cat) => cat.parentId === null)
        .map((cat) => String(cat.id)),
    [categoryList],
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>카테고리 관리</h1>
      </header>

      <div className={styles.content}>
        {/* 왼쪽 */}
        <aside className={styles.treeSection}>
          <div className={styles.treeHeader}>
            <span>분류 구조</span>

            <div className={styles.headerBtns}>
              <button className={styles.saveOrderBtn} onClick={handleSaveOrder}>
                <Save size={14} /> 저장
              </button>
              <button className={styles.addBtn} onClick={handleAddNewMain}>
                <Plus size={16} /> 추가
              </button>
            </div>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={(e) => {
              setActiveId(null);
              handleDragEnd(e);
            }}
          >
            <SortableContext
              items={mainCategoryIds}
              strategy={verticalListSortingStrategy}
            >
              <div className={styles.treeBody}>
                {categoryList
                  .filter((cat) => cat.parentId === null)
                  .map((cat) => (
                    <CategoryItem
                      key={String(cat.id)}
                      category={cat}
                      onSelect={handleSelectCategory}
                      onAddSub={handleAddSub}
                      onDelete={handleDeleteCategory}
                    />
                  ))}

                {isAddingNew && !parentId && (
                  <div className={`${styles.item} ${styles.newItem}`}>
                    <span style={{ width: 14 }} />
                    <Folder
                      size={16}
                      className={styles.folderIcon}
                      style={{ color: "#94a3b8" }}
                    />
                    <span
                      className={styles.name}
                      style={{ color: "#94a3b8", fontStyle: "italic" }}
                    >
                      {name || "새 대분류..."}
                    </span>
                  </div>
                )}
              </div>
            </SortableContext>

            {mounted &&
              typeof document !== "undefined" &&
              createPortal(
                <DragOverlay
                  dropAnimation={{
                    duration: 150,
                    easing: "ease",
                  }}
                >
                  {activeItem ? (
                    <div
                      className={styles.item}
                      style={{
                        background: "#fff",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                        borderRadius: "8px",
                        opacity: 0.95,
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        width: "auto", // 너비가 튈 수 있으니 적절히 조절
                        minWidth: "200px",
                        pointerEvents: "none", // 마우스 포인터가 오버레이를 통과하게 함
                      }}
                    >
                      <span style={{ marginRight: "8px" }}>⠿</span>
                      <Folder size={16} className={styles.folderIcon} />
                      <span className={styles.name}>{activeItem.name}</span>
                    </div>
                  ) : null}
                </DragOverlay>,
                document.body,
              )}
          </DndContext>
        </aside>

        {/* 오른쪽*/}
        {selectedCategory || isAddingNew ? (
          <main className={styles.editSection}>
            <div className={styles.card}>
              <h3>
                {isAddingNew
                  ? "1차 카테고리 등록"
                  : `[${selectedCategory?.name}] 관리`}
              </h3>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label>소속 위치</label>
                  {isAddingNew ? (
                    <input
                      type="text"
                      value={
                        parentId
                          ? `${categoryList.find((c) => c.id === parentId)?.name}의 하위`
                          : "최상위 (1차)"
                      }
                      disabled
                      style={{ background: "#f1f5f9", color: "#64748b" }}
                    />
                  ) : selectedCategory?.parentId ? (
                    <select
                      value={parentId || ""}
                      onChange={(e) => setParentId(e.target.value || null)}
                    >
                      {categoryList
                        .filter((cat) => cat.parentId === null)
                        .map((mainCat) => (
                          <option key={mainCat.id} value={mainCat.id}>
                            {mainCat.name}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value="최상위 (1차 카테고리)"
                      disabled
                      style={{ background: "#f1f5f9", color: "#4f5d70" }}
                    />
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label>카테고리 이름</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="예: 도복/용품"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>URL 슬러그</label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {parentId && (
                      <span style={{ color: "#64748b", fontWeight: "bold" }}>
                        {getParentSlug(categoryList, parentId)}
                      </span>
                    )}
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder={
                        parentId ? "sub-category-url" : "main-category-url"
                      }
                      style={{ flex: 1 }}
                    />
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                      marginTop: "4px",
                    }}
                  >
                    최종 경로: /{getParentSlug(categoryList, parentId)}
                    {slug || "..."}
                  </p>
                </div>

                <div className={styles.inputGroup}>
                  <label>노출 여부</label>
                  <select
                    value={isVisible}
                    onChange={(e) => setIsVisible(e.target.value)}
                  >
                    <option value="true">✅ 노출 (서비스 진행 중)</option>
                    <option value="false">🚫 숨김 (관리자만 확인 가능)</option>
                  </select>
                </div>

                <div className={styles.btnGroup}>
                  <button type="submit" className={styles.saveBtn}>
                    <Save size={18} />
                    {isAddingNew ? "새 카테고리 등록" : "수정사항 저장"}
                  </button>
                </div>
              </form>
            </div>
          </main>
        ) : (
          <div className={styles.emptySection}>
            <div className={styles.emptyMessage}>
              <Folder size={48} />
              <p>
                관리할 카테고리를 선택하거나
                <br />새 카테고리를 추가해주세요
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryItem({
  category,
  onSelect,
  onAddSub,
  onDelete,
  depth = 0,
}: {
  category: CategoryWithChildren;
  onSelect: (cat: CategoryWithChildren) => void;
  onAddSub: (cat: CategoryWithChildren) => void;
  onDelete: (cat: CategoryWithChildren) => void;
  depth?: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: String(category.id),
    data: { parentId: category.parentId },
  });

  const style = {
    transform: transform
      ? `translate3d(${Math.round(transform.x)}px, ${Math.round(transform.y)}px, 0)`
      : undefined,
    transition,
    opacity: isDragging ? 0.3 : 1,
    touchAction: "none",
  };

  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = category.children && category.children.length > 0;

  const childIds = useMemo(
    () => category.children?.map((c) => String(c.id)) || [],
    [category.children],
  );

  return (
    <div ref={setNodeRef} style={style} className={styles.itemWrapper}>
      <div className={styles.item} onClick={() => onSelect(category)}>
        <span
          className={styles.dragHandle}
          {...attributes}
          {...listeners}
          style={{ cursor: "grab", marginRight: "8px" }}
        >
          ⠿
        </span>

        <span
          className={styles.toggle}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          {hasChildren ? (
            isOpen ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )
          ) : (
            <span style={{ width: 14 }} />
          )}
        </span>

        <Folder size={16} className={styles.folderIcon} />
        <span className={styles.name}>{category.name}</span>

        <span className={styles.orderBadge}>{category.sortOrder}</span>

        <div className={styles.actions}>
          {depth === 0 && (
            <Plus
              size={14}
              onClick={(e) => {
                e.stopPropagation();
                onAddSub(category);
              }}
            />
          )}
          <Edit2 size={14} />
          <Trash2
            size={14}
            className={styles.deleteIcon}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(category);
            }}
          />
        </div>
      </div>

      {isOpen && hasChildren && (
        <div className={styles.subList} style={{ paddingLeft: "20px" }}>
          <SortableContext
            items={childIds}
            strategy={verticalListSortingStrategy}
          >
            {category.children?.map((sub) => (
              <CategoryItem
                key={String(sub.id)}
                category={sub}
                onSelect={onSelect}
                onAddSub={onAddSub}
                onDelete={onDelete}
                depth={depth + 1}
              />
            ))}
          </SortableContext>
        </div>
      )}
    </div>
  );
}
