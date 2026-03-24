import styled from "@emotion/styled";

export const Inner = styled.div`
  padding-bottom: 300px;
  min-height: 100vh;

  /* 페이지네이션 */
  nav {
    margin: 30px 0;
  }
`;

export const PaginationWrapper = styled.div`
  .pagination {
    display: flex;
    list-style: none;
    justify-content: center;
    padding: 0;
    margin: 20px 0;
  }

  .pagination button {
    padding: 10px;
    border: 1px solid #ccc;
    margin: 0 5px;
    cursor: pointer;
  }

  .pagination .active {
    background-color: #007bff;
    color: white;
  }

  .pagination button:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  > h2 {
    display: inline-block;
    font-size: 32px;
    margin-right: 25px;
  }

  > button {
    align-self: center;
    width: 95px;
    height: 30px;
    font-size: 15px;
    background-color: #1e40af;
    color: white;
    border-radius: 15.5px;
  }
`;

export const ProductFilter = styled.section`
  margin-top: 20px;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  margin-bottom: 30px;

  h4 {
    font-weight: 700;
    margin-bottom: 10px;
    color: #222;
    font-size: 16px;
  }
`;

export const FilterStatus = styled.div`
  margin-bottom: 35px;

  > ul {
    display: flex;
    gap: 7px;

    > li {
      > button {
      }
    }
  }
`;

export const FilterGroup = styled.div`
  display: flex;
`;

export const FilteCategoryStatus = styled.div`
  margin-right: 25px;

  > div {
    display: inline-block;
    position: relative;

    > select {
      width: 120px;
      color: #555;
      padding: 10px;
      border: 1px solid #d1d5db;
      border-radius: 5px;

      &:first-of-type {
        margin-right: 8px;
      }
    }

    > span {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20px;
      font-size: 11px;
    }
  }
`;

export const SearchInput = styled.div`
  margin-right: 25px;

  > input {
    padding: 10px;
    border-radius: 5px;
    width: 255px;
  }
`;

export const FilterActions = styled.div`
  display: flex;
  gap: 8px;
  align-self: flex-end;

  > button {
    padding: 10px;
    font-size: 14px;
    border-radius: 5px;

    &:first-of-type {
      background-color: #1e40af;
      color: white;
    }

    &:last-of-type {
      border: 1px solid #ddd;
      color: #555;
    }
  }
`;

export const List = styled.li<{ active: boolean }>`
  > button {
    font-size: 14px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    color: ${(props) => (props.active ? "white" : "#555")};
    background-color: ${(props) => (props.active ? "#333" : "white")};
  }
`;
