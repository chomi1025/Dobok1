"use client";
import * as A from "./style";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { ProductFormValues } from "./page.client";

interface SortableItemProps {
  id: string;
  preview: string;
  fileName: string;
  onRemove: () => void;
}

// 개별 이미지 아이템
function SortableItem({ id, preview, fileName, onRemove }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "inline-grid",
    gridTemplateColumns: "30px 60px 90px 240px 40px",
    alignItems: "center",
    gap: "15px",
    borderRadius: "6px",
    background: "#fff",
    padding: "4px",
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ cursor: "grab", color: "#9CA3AF" }}>⠿</div>
      <img
        src={preview}
        alt=""
        style={{
          width: "60px",
          height: "60px",
          objectFit: "cover",
          borderRadius: "4px",
        }}
      />
      <a
        href={preview}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        style={{ fontSize: "14px", color: "#2563EB", textAlign: "center" }}
      >
        [미리보기]
      </a>
      <span
        style={{
          fontSize: "14px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {fileName}
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // drag로 이벤트 전파 방지
          onRemove();
        }}
        style={{
          pointerEvents: "auto",
          background: "none",
          border: "none",
          color: "red",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        ✕
      </button>
    </div>
  );
}

// 메인 컴포넌트
export default function ProductImagecomponent() {
  const [tempThumbnail, setTempThumbnail] = useState(null);
  const { setValue, watch } = useFormContext<ProductFormValues>();
  const images = watch("images") || [];
  const thumbnail = watch("thumbnail") || null;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px 이상 움직여야 드래그 시작 (그 이하는 클릭으로 간주)
      },
    }),
  );

  const thumbnailPreview = tempThumbnail || thumbnail?.preview;

  // 썸네일
  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setValue("thumbnail", { file, preview }, { shouldValidate: true });
  };

  // 상세이미지 추가
  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = Array.from(e.target.files || []);
      const newImages = files.map((file, idx) => ({
        id: `${Date.now()}-${idx}`,
        file,
        preview: URL.createObjectURL(file),
      }));
      setValue("images", [...images, ...newImages], { shouldValidate: true });
    } catch (err) {
      console.log(err);
    }
  };

  // 상세이미지 삭제
  const handleRemove = (id: string) => {
    try {
      setValue(
        "images",
        images.filter((img) => img.id !== id),
        { shouldValidate: true },
      );
    } catch (err) {
      console.log(err);
    }
  };
  // DND 종료
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over.id);
      const updatedImages = arrayMove(images, oldIndex, newIndex);
      setValue("images", updatedImages, { shouldValidate: true });
    }
  };

  return (
    <A.Section variant="ProductImage">
      <h3>이미지</h3>
      <hr />

      <A.SmallSection variant="thumbnail">
        <h4>대표이미지</h4>
        <label htmlFor="thumbnail">
          {thumbnailPreview ? (
            <Image
              src={thumbnailPreview}
              alt="상품 썸네일 이미지"
              width={212}
              height={212}
              priority
            />
          ) : (
            <span>썸네일 등록하기</span>
          )}
        </label>
        <input
          id="thumbnail"
          type="file"
          accept="image/*"
          onChange={handleThumbnail}
        />
      </A.SmallSection>

      <A.SmallSection variant="detail">
        <h4>상세이미지</h4>
        <div>
          <label htmlFor="detailImages">+ 이미지 추가</label>
          <input
            id="detailImages"
            type="file"
            multiple
            accept="image/*"
            onChange={handleAddImages}
            style={{ display: "none" }}
          />
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images.map((img) => img.id)}
            strategy={verticalListSortingStrategy}
          >
            <A.DndInner>
              {images.length === 0 ? (
                <A.NoImageBox>이미지 없음</A.NoImageBox>
              ) : (
                images.map((img) => (
                  <SortableItem
                    key={img.id}
                    id={img.id}
                    preview={img.preview}
                    fileName={img.file?.name || ""}
                    onRemove={() => handleRemove(img.id)}
                  />
                ))
              )}
            </A.DndInner>
          </SortableContext>
        </DndContext>
      </A.SmallSection>
    </A.Section>
  );
}
