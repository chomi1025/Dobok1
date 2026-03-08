import styled from "@emotion/styled";

export const Inner = styled.div`
  flex: 1;

  > h2 {
    font-size: 32px;
    margin-bottom: 30px;
  }
`;

export const OrderFilter = styled.section`
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

export const FilterPeriod = styled.div`
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

export const FilterOrderStatus = styled.div`
  margin-right: 25px;

  > select {
    width: 85px;
    color: #555;
    padding: 10px;
    border: 1px solid #d1d5db;
    border-radius: 5px;
  }
`;

export const FilterDeliveryStatus = styled.div`
  margin-right: 25px;

  > select {
    color: #555;
    padding: 10px;
    border: 1px solid #d1d5db;
    border-radius: 5px;
    width: 85px;
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
