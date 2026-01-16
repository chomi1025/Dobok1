"use client";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  main_slug: string;
  sub_slug: string;
  price: number | null;
  original_price: number;
  sale_rate: number | null;
  thumbnail: string;
  is_best: boolean;
  stock: number;
  rating: number | null;
  review_count: number | null;
  created_at: string;
};

async function fetchProduct() {
  const { data, error } = await supabase.from("products").select();

  console.log("데이터는", data);
  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return data;
}

export default function HomePage() {
  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProduct().then((data) => {
      if (data && data.length > 0) setProduct(data[0]); // 첫 번째 상품
    });
  }, []);

  return <div>ㅁㄴㅇ</div>;
}
