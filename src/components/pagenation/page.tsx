import styled from "@emotion/styled";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React from "react";
import ReactPaginate from "react-paginate";

export const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 40px 0;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
    gap: 8px;
    align-items: center;
  }

  .pagination li {
    display: flex;
    justify-content: center;
    align-items: center;
  }

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

  .pagination li a:hover:not(.disabled) {
    background-color: #f8f9fa;
    border-color: #000;
  }

  .pagination .active a {
    background-color: #000;
    color: #fff;
    border-color: #000;
    font-weight: 600;
  }

  .pagination .previous a,
  .pagination .next a {
    font-weight: 500;
    border-color: #e1e2e3;
  }

  .pagination .disabled a {
    color: #ccc;
    cursor: not-allowed;
    background-color: #fafafa;
    border-color: #eee;
  }

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
        forcePage={currentPage - 1}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
      />
    </PaginationWrapper>
  );
}
