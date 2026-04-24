"use client";
import AdminProductDetailLayout from "@/components/common/ProductAddLayout/page";

export default function AdminProductNewClient({ product, categories }: any) {
  return (
    <>
      <AdminProductDetailLayout
        product={product}
        categories={categories}
        mode="create"
      />
    </>
  );
}
