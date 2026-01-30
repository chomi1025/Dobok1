import styled from "@emotion/styled";

export const PeriodTabs = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;

  > ul {
    display: flex;
  }

  /* 날짜 */
  > div {
    display: flex;
    align-items: center;

    div {
      .react-datepicker__input-container {
        > input {
          width: 163px;
          height: 50px;
          padding-right: 8px;
          text-align: right;
        }
      }

      .react-datepicker__day {
        padding: 0.5rem; /* 글로벌 reset 덮어쓰기 */
        text-align: center;
        line-height: 1.5;
      }

      .react-datepicker__day--selected {
        background-color: #333;
        color: white;
      }
    }

    > span {
      margin: 0 8px;
    }

    > button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 100%;
      color: white;
      background-color: #333;
      border-radius: 4px;
      margin-left: 20px;
    }
  }
`;

export const Tab = styled.li<{ active: boolean }>`
  width: 95px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  cursor: pointer;
  color: ${({ active }) => (active ? "white" : "#333")};
  background-color: ${({ active }) => (active ? "#333" : "white")};

  &:first-of-type {
    border-radius: 4px 0 0 4px;
  }
  &:last-of-type {
    border-radius: 0 4px 4px 0;
  }

  .react-datepicker__input-container {
    input {
    }
  }
`;

export const ProductDetail = styled.div<{ header?: boolean }>`
  flex: 4;
  display: ${({ header }) => (header ? "block" : "flex")};
  align-items: center;
  text-align: ${({ header }) => (header ? "center" : "left")};
  gap: 20px;

  img {
    width: 90px;
    height: 90px;
  }

  p {
    margin: 0;
    display: flex;
    align-items: center;
    text-decoration: underline;
  }
`;

export const PriceInfo = styled.div`
  flex: 1.2; // 상품금액/수량
  text-align: center;
`;

export const TotalPrice = styled.div`
  flex: 1.2; // 합계금액
  text-align: center;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center; // 중앙정렬
  width: 100%; // 부모 전체 차지
  margin-top: 70px;
  padding: 0;

  .pagination {
    display: flex; // ul flex로
    flex-wrap: wrap; // 버튼 많으면 다음 줄로 넘어감
    gap: 8px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .page-item {
    display: flex;
  }

  .page-link {
    padding: 6px 12px; // 글로벌 초기화 덮어쓰기
    height: 36px; // 높이 고정
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .active .page-link {
    font-weight: bold;
    border-color: black;
  }
`;
