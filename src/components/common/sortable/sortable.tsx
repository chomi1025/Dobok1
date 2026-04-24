"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

interface SortableImageItemProps {
  id: string;
  url: string;
  index: number;
  styles: any;
  handleDeleteImage: (index: number) => void;
}

export function SortableImageItem({
  id,
  url,
  index,
  styles,
  handleDeleteImage,
}: SortableImageItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
  };

  const getFileName = (path: string) => {
    return path.split("/").pop() || `image_${index + 1}`;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.sortableListItem} ${isDragging ? styles.dragging : ""}`}
    >
      <div className={styles.dragArea} {...attributes} {...listeners}>
        <div className={styles.imageWrapper}>
          <Image
            src={url}
            alt={`product image ${index + 1}`}
            fill
            className={styles.image}
          />
        </div>
        <span className={styles.fileName}>{getFileName(url)}</span>
      </div>

      <button
        type="button"
        className={styles.deleteButton}
        onClick={() => handleDeleteImage(index)}
        title="이미지 삭제"
      >
        ✕
      </button>
    </div>
  );
}
