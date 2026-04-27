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

  const [options, setOptions] = useState<any[]>(product?.options || []);

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
    };
    setOptions([...options, newOption]);
  };

  const handleOptionChange = (id: string, field: string, value: any) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, [field]: value } : opt)),
    );
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
        options: options,
        optionNames: optionNames,
      };

      const url = isEditMode
        ? `/api/admin/products/${product.id}`
        : "/api/admin/products";

      const response = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
              <th>가격</th>
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
                <td>
                  <button
                    className={styles.deleteBtn}
                    onClick={() =>
                      setOptions(options.filter((o) => o.id !== opt.id))
                    }
                  >
                    삭제
                  </button>
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
