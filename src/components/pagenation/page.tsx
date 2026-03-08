import styled from "@emotion/styled";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React from "react";
import ReactPaginate from "react-paginate";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
    gap: 8px; // 버튼 사이 간격
    align-items: center;
  }

  .pagination li {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* 숫자와 이전/다음 공통 스타일 */
  .pagination li a {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 36px;
    height: 36px;
    padding: 0 8px;
    border: 1px solid #e1e2e3;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    color: #333;
    background-color: #fff;
    transition: all 0.2s ease;
    text-decoration: none;
    user-select: none;
  }

  /* 호버 효과 */
  .pagination li a:hover:not(.disabled) {
    background-color: #f8f9fa;
    border-color: #000;
  }

  /* 활성화된 페이지 (현재 페이지) */
  .pagination .active a {
    background-color: #000; // 검은색으로 포인트를 주면 더 세련돼 보여!
    color: #fff;
    border-color: #000;
    font-weight: 600;
  }

  /* 이전/다음 글자 스타일 */
  .pagination .previous a,
  .pagination .next a {
    font-weight: 500;
    border-color: #e1e2e3;
  }

  /* 비활성화 상태 (첫 페이지에서 '이전' 등) */
  .pagination .disabled a {
    color: #ccc;
    cursor: not-allowed;
    background-color: #fafafa;
    border-color: #eee;
  }

  /* 생략 부호 (...) 스타일 */
  .pagination .break a {
    border: none;
    background: none;
    cursor: default;
  }
`;

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  if (totalPages <= 1) return null;

  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = ({ selected }: { selected: number }) => {
    const page = selected + 1;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false } as any);
  };

  return (
    <PaginationWrapper>
      <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        pageCount={totalPages}
        forcePage={currentPage - 1} // 현재 페이지 강제 적용
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
      />
    </PaginationWrapper>
  );
}
