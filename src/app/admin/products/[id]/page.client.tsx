"use client";

import AdminProductDetailLayout from "@/components/common/ProductAddLayout/page";

export interface ProductFormValues {
  name: string;
  description: string;
  thumbnail: { file: File | null; preview: string } | null;
  images: { id: string; file: File | null; preview: string }[];
}

export default function AdminProductDetailClient({ product, categories }: any) {
  return (
    <AdminProductDetailLayout
      product={product}
      categories={categories}
      mode="edit"
    />
  );
}
