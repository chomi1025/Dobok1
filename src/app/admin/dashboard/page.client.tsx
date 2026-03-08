"use client";
import * as D from "./style";
import Link from "next/link";

export default function DashboardClientPage() {
  return (
    <D.Inner>
      <h2>대시보드</h2>

      <D.DashboardCards>
        <section aria-label="오늘 주문">
          <h3>
            오늘 주문 <Link href={""}>12</Link>
          </h3>
        </section>

        <section aria-label="처리 대기">
          <h3>
            처리 대기<Link href={""}>12</Link>
          </h3>
        </section>

        <section aria-label="배송 중">
          <h3>
            배송 중<Link href={""}>12</Link>
          </h3>
        </section>

        <section aria-label="전체 상품">
          <h3>
            전체 상품<Link href={""}>12</Link>
          </h3>
        </section>
      </D.DashboardCards>
    </D.Inner>
  );
}
