"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import * as A from "./style";
import Link from "next/link";

export default function AdminSidebar() {
  const segment = useSelectedLayoutSegment() ?? "";

  return (
    <A.Inner>
      <h1>관리자페이지</h1>

      <nav aria-label="관리자페이지 사이드바">
        <ul>
          <A.List active={segment == "dashboard"}>
            <Link href={"/admin/dashboard"}>대시보드</Link>
          </A.List>
          <A.List active={segment == "orders"}>
            <Link href={"/admin/orders"}>주문 관리</Link>
          </A.List>
          <A.List active={segment == "products"}>
            <Link href={"/admin/products"}>상품 관리</Link>
          </A.List>
          <A.List active={segment == "categories"}>
            <Link href={"/admin/categories"}>카테고리 관리</Link>
          </A.List>
          <A.List active={segment == "users"}>
            <Link href={"/admin/users"}>회원 관리</Link>
          </A.List>
        </ul>
      </nav>
    </A.Inner>
  );
}
