"use client";
import { useRef, useState, useMemo } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Button from "@/components/common/buttons/page";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableImageItem } from "@/components/common/sortable/sortable";
import { uploadToCloudinary } from "@/utils/cloudinary";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ImagePlus } from "lucide-react";

interface AdminProductClientProps {
  product?: any;
  categories: any[];
  mode: "create" | "edit";
}

const statusMap = {
  ONSALE: "판매중",
  SOLDOUT: "품절",
  HIDDEN: "숨김",
};

export default function AdminProductDetailLayout({
  product,
  categories,
  mode,
}: AdminProductClientProps) {
  const isEditMode = mode === "edit";

  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    parentCategoryId: product?.category?.parentId || "",
    categoryId: product?.categoryId || "",
    isCustomizable: product?.isCustomizable || false,

    discountType: product?.discountType || "PERCENTAGE",
    discountValue: product?.discountValue || "",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string>(
    product?.thumbnail || "/no-image.png",
  );

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const [images, setImages] = useState<string[]>(product?.images || []);

  const [optionNames, setOptionNames] = useState({
    name1: product?.options?.[0]?.optionName || "",
    name2: product?.options?.[0]?.optionName2 || "",
  });

  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const router = useRouter();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const subCategories = useMemo(() => {
    if (!formData.parentCategoryId) return [];
    const parent = categories.find(
      (cat) => cat.id === formData.parentCategoryId,
    );
    return parent?.children || [];
  }, [categories, formData.parentCategoryId]);

  const handleParentCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newParentId = Number(e.target.value);
    const parent = categories.find((cat) => cat.id === newParentId);
    const newSubCategories = parent?.children || [];

    setFormData({
      ...formData,
      parentCategoryId: newParentId,
      categoryId: newSubCategories.length > 0 ? newSubCategories[0].id : "",
    });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);

      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const newUrls = fileArray.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...newUrls]);
    setGalleryFiles((prev) => [...prev, ...fileArray]);
  };

  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const [optionConfig, setOptionConfig] = useState({
    useOption2: !!product?.options?.[0]?.optionName2,
    name1: product?.options?.[0]?.optionName || "",
    name2: product?.options?.[0]?.optionName2 || "",
  });

  const [options, setOptions] = useState<any[]>(
    product?.options?.map((opt: any) => ({
      id: opt.id,

      optionValue: opt.optionValue,
      optionValue2: opt.optionValue2,
      price: opt.price,
      stock: opt.stock,
      status: opt.status,

      discountType: opt.discountType ?? "PERCENTAGE",
      discountValue: opt.discountValue ?? "",
    })) || [],
  );

  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleAddOption = () => {
    const newOption = {
      id: `new-${Date.now()}`,
      optionName: optionConfig.name1,
      optionName2: optionConfig.useOption2 ? optionConfig.name2 : null,
      optionValue: "",
      optionValue2: optionConfig.useOption2 ? "" : null,
      price: 0,
      stock: 0,
      status: "ONSALE",
      discountType: "PERCENTAGE",
      discountValue: "",
    };
    setOptions([...options, newOption]);
  };

  const handleOptionChange = (id: string, field: string, value: any) => {
    setOptions((prev) =>
      prev.map((opt) => {
        if (opt.id !== id) return opt;

        const updated = { ...opt, [field]: value };

        const price = Number(updated.price) || 0;
        const discountValue = Number(updated.discountValue) || 0;

        if (field === "discountValue") {
          if (updated.discountType === "FIXED") {
            if (discountValue > price) {
              toast.error("할인 금액은 원가를 넘을 수 없습니다.");
              updated.discountValue = price;
            }
          }

          if (updated.discountType === "PERCENTAGE") {
            if (discountValue > 100) {
              toast.error("할인율은 100%를 넘을 수 없습니다.");
              updated.discountValue = 100;
            }
          }
        }

        if (field === "price") {
          if (updated.discountType === "FIXED") {
            if (Number(updated.discountValue) > Number(value)) {
              updated.discountValue = value;
              toast.error("할인 금액이 원가보다 높아 자동 조정됐습니다.");
            }
          }
        }

        return updated;
      }),
    );
  };

  const handleDeleteOption = (id: string) => {
    if (options.length <= 1) {
      return toast.error("최소 한 개의 옵션은 있어야 합니다.");
    }
    setOptions(options.filter((opt) => opt.id !== id));
  };

  const handleSubmit = async () => {
    if (!thumbnailPreview || thumbnailPreview === "/no-image.png") {
      return toast.error("썸네일 이미지를 등록해주세요.");
    }
    if (!formData.name.trim()) {
      return toast.error("상품명을 입력해주세요.");
    }
    if (!formData.categoryId) {
      return toast.error("카테고리를 선택해주세요.");
    }
    if (!formData.description.trim()) {
      return toast.error("상품 설명을 입력해주세요.");
    }

    if (options.length === 0) {
      return toast.error("최소 하나 이상의 옵션을 등록해야 합니다.");
    }

    for (const [index, opt] of options.entries()) {
      const optionNum = index + 1;
      if (!opt.optionValue?.trim()) {
        return toast.error(`${optionNum}번째 옵션의 값을 입력해주세요.`);
      }

      if (opt.price < 0) {
        return toast.error(`${optionNum}번째 옵션의 가격을 확인해주세요.`);
      }
      if (opt.stock < 0) {
        return toast.error(`${optionNum}번째 옵션의 재고를 확인해주세요.`);
      }
    }

    for (const [index, opt] of options.entries()) {
      const price = Number(opt.price) || 0;
      const discount = Number(opt.discountValue) || 0;

      if (opt.discountType === "FIXED" && discount > price) {
        return toast.error(
          `${index + 1}번째 옵션: 할인 금액이 원가를 초과할 수 없습니다.`,
        );
      }

      if (opt.discountType === "PERCENTAGE" && discount > 100) {
        return toast.error(
          `${index + 1}번째 옵션: 할인율은 100%를 넘을 수 없습니다.`,
        );
      }
    }

    const loadingToast = toast.loading(
      isEditMode ? "수정 중..." : "등록 중...",
    );

    try {
      let thumbnailUrl = thumbnailPreview;
      if (thumbnailFile) {
        thumbnailUrl = await uploadToCloudinary(thumbnailFile);
      }

      const newGalleryUrls = await Promise.all(
        galleryFiles.map((file) => uploadToCloudinary(file)),
      );

      const existingImages = images.filter((url) => !url.startsWith("blob:"));
      const finalImages = [...existingImages, ...newGalleryUrls];

      const payload = {
        name: formData.name,
        description: formData.description,
        categoryId: Number(formData.categoryId),
        isCustomizable: formData.isCustomizable,
        thumbnail: thumbnailUrl,
        images: finalImages,
        discountType: formData.discountType,
        discountValue: formData.discountValue
          ? Number(formData.discountValue)
          : null,

        options: options.map((opt) => ({
          ...opt,
          id: String(opt.id).startsWith("new-") ? undefined : opt.id,
          discountValue: opt.discountValue ? Number(opt.discountValue) : null,
        })),
        optionNames: optionNames,
      };

      const url = isEditMode
        ? `/api/admin/products/${product.id}`
        : "/api/admin/products";

      const response = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(
          isEditMode ? "수정이 완료되었습니다!" : "상품이 등록되었습니다!",
          {
            id: loadingToast,
          },
        );

        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 1500);
      } else {
        const errorData = await response.json();
        alert(`실패: ${errorData.message}`);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(`실패: ${error.message}`, { id: loadingToast });
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>{isEditMode ? "상품 상세 관리" : "신규 상품 등록"}</h2>
        <div className={styles.actions}>
          <Button variant="edit" onClick={handleSubmit}>
            {isEditMode ? "정보 수정 저장" : "상품 등록 완료"}
          </Button>
          <Button
            onClick={() => router.push("/admin/products")}
            variant="black"
          >
            목록으로
          </Button>
        </div>
      </header>

      <section className={styles.content}>
        <div
          className={`${styles.mainImage} ${!thumbnailPreview || thumbnailPreview === "/no-image.png" ? styles.centered : ""}`}
          onClick={() => thumbnailInputRef.current?.click()}
        >
          {thumbnailPreview && thumbnailPreview !== "/no-image.png" ? (
            <Image
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className={styles.uploadPlaceholder}>
              <ImagePlus size={48} strokeWidth={1} className={styles.icon} />
              <span className={styles.placeholderText}>
                썸네일 사진을 등록해주세요
              </span>
              <span className={styles.supportText}>(권장 : 500px * 500px)</span>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            ref={thumbnailInputRef}
            onChange={handleThumbnailChange}
            style={{ display: "none" }}
          />
        </div>

        <div className={styles.infoSection}>
          <div className={styles.inputGroup}>
            <label>상품명</label>
            <input
              type="text"
              placeholder="상품명을 입력하세요"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label>카테고리</label>
            <div className={styles.categorySelects}>
              <select
                value={formData.parentCategoryId}
                onChange={handleParentCategoryChange}
              >
                <option value="">1차 카테고리 선택</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {subCategories.length > 0 && (
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      categoryId: Number(e.target.value),
                    })
                  }
                >
                  <option value="">2차 카테고리 선택</option>
                  {subCategories.map((sub: any) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>상품 전체 할인 설정 (카테고리 할인보다 우선 적용)</label>
            <div
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <select
                value={formData.discountType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountType: e.target.value as any,
                  })
                }
                style={{ width: "120px" }}
              >
                <option value="PERCENTAGE">퍼센트(%)</option>
                <option value="FIXED">금액(원)</option>
              </select>
              <input
                type="number"
                placeholder="할인값 입력 (미입력 시 할인 없음)"
                value={formData.discountValue}
                onChange={(e) =>
                  setFormData({ ...formData, discountValue: e.target.value })
                }
                style={{ flex: 1 }}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>설명</label>
            <textarea
              rows={5}
              placeholder="상품 설명을 입력하세요"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className={`${styles.inputGroup} ${styles.custom}`}>
            <label>주문제작 상품여부(도장 마크, 이름 추가 작업 등)</label>
            <input
              type="checkbox"
              checked={formData.isCustomizable}
              onChange={(e) =>
                setFormData({ ...formData, isCustomizable: e.target.checked })
              }
            />
          </div>
        </div>
      </section>

      <section className={styles.imageGallery}>
        <h4>상품 상세 이미지 </h4>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images}
            strategy={verticalListSortingStrategy}
          >
            <div className={styles.imageList}>
              {images.map((url, index) => (
                <SortableImageItem
                  key={url}
                  id={url}
                  url={url}
                  index={index}
                  handleDeleteImage={handleDeleteImage}
                  styles={styles}
                />
              ))}

              <div
                className={styles.addImagePlaceholder}
                onClick={() => galleryInputRef.current?.click()}
              >
                <span>+ 이미지 추가</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={galleryInputRef}
                  onChange={handleGalleryImageChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </SortableContext>
        </DndContext>
      </section>

      <section className={styles.optionSection}>
        <div
          className={styles.sectionHeader}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h4>재고 및 옵션 관리</h4>
          <Button variant="edit" onClick={handleAddOption}>
            + 옵션 추가
          </Button>
        </div>

        <table className={styles.optionTable}>
          <thead>
            <tr>
              <th>
                <input
                  className={styles.headerInput}
                  value={optionNames.name1}
                  onChange={(e) =>
                    setOptionNames({ ...optionNames, name1: e.target.value })
                  }
                  placeholder="옵션명 1"
                />
              </th>
              <th>
                <input
                  className={styles.headerInput}
                  value={optionNames.name2}
                  onChange={(e) =>
                    setOptionNames({ ...optionNames, name2: e.target.value })
                  }
                  placeholder="옵션명 2"
                />
              </th>
              <th>가격(원가)</th>
              <th>할인 설정</th>
              <th>재고</th>
              <th>상태</th>
              <th>삭제</th>
            </tr>
          </thead>

          <tbody>
            {options.map((opt: any) => (
              <tr key={opt.id}>
                {/* 1차 옵션 값 */}
                <td>
                  <input
                    type="text"
                    value={opt.optionValue || ""}
                    onChange={(e) =>
                      handleOptionChange(opt.id, "optionValue", e.target.value)
                    }
                    placeholder={`${optionNames.name1} 입력`}
                  />
                </td>

                {/* 2차 옵션 값 */}
                <td>
                  <input
                    type="text"
                    value={opt.optionValue2 || ""}
                    onChange={(e) =>
                      handleOptionChange(opt.id, "optionValue2", e.target.value)
                    }
                    placeholder={`${optionNames.name2} 입력`}
                  />
                </td>

                {/* 가격 */}
                <td>
                  <div className={styles.inputWrapper}>
                    <input
                      type="number"
                      value={opt.price === 0 ? "" : opt.price}
                      onChange={(e) =>
                        handleOptionChange(opt.id, "price", e.target.value)
                      }
                      placeholder="0"
                    />
                    <span>원</span>
                  </div>
                </td>

                {/* 할인 */}
                <td>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <select
                      value={opt.discountType || "PERCENTAGE"}
                      onChange={(e) =>
                        handleOptionChange(
                          opt.id,
                          "discountType",
                          e.target.value,
                        )
                      }
                      style={{
                        height: "32px",
                        fontSize: "12px",
                        width: "75px",
                      }}
                    >
                      <option value="PERCENTAGE">할인율(%)</option>
                      <option value="FIXED">할인가(원)</option>
                    </select>
                    <input
                      type="number"
                      placeholder="값"
                      value={
                        opt.discountValue === null
                          ? ""
                          : String(opt.discountValue)
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          opt.id,
                          "discountValue",
                          e.target.value === "" ? null : Number(e.target.value),
                        )
                      }
                      style={{
                        width: "60px",
                        height: "32px",
                        textAlign: "right",
                      }}
                    />
                  </div>
                </td>

                {/* 가격 */}

                {/* 재고 */}
                <td>
                  <div className={styles.inputWrapper}>
                    <input
                      type="number"
                      value={opt.stock === 0 ? "" : opt.stock}
                      onChange={(e) =>
                        handleOptionChange(
                          opt.id,
                          "stock",
                          Number(e.target.value),
                        )
                      }
                    />
                    <span>개</span>
                  </div>
                </td>

                {/* 상태  */}
                <td>
                  <select
                    value={opt.status}
                    onChange={(e) =>
                      handleOptionChange(opt.id, "status", e.target.value)
                    }
                  >
                    {Object.entries(statusMap).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </td>

                {/* 삭제 버튼 */}
                <td className={styles.deleteCol}>
                  <button onClick={() => handleDeleteOption(opt.id)}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Button onClick={handleSubmit} variant="edit">
        {isEditMode ? "수정하기" : "등록하기"}
      </Button>
    </div>
  );
}
