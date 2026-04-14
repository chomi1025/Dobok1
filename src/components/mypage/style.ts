import styled from "@emotion/styled";

export const PeriodTabs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;

  > ul {
    display: flex;
    background: #fff;
    border-radius: 8px;
    padding: 4px;
    border: 1px solid #eee;
  }

  /* 날짜 선택 영역 */
  > div {
    display: flex;
    align-items: center;
    gap: 8px;

    .react-datepicker-wrapper {
      width: 140px;
    }

    input {
      width: 100%;
      height: 44px;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 0 12px;
      font-size: 14px;
      color: #333;
      text-align: center;
      transition: border-color 0.2s;

      &:focus {
        border-color: #000;
        outline: none;
      }
    }

    > span {
      color: #999;
    }

    > button {
      width: 70px;
      height: 44px;
      background-color: #000;
      color: #fff;
      border-radius: 6px;
      font-size: 14px;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Tab = styled.li<{ active: boolean }>`
  width: 80px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px !important;
  cursor: pointer;
  font-size: 13px;
  font-weight: ${({ active }) => (active ? "600" : "400")};
  color: ${({ active }) => (active ? "#fff" : "#666")};
  background-color: ${({ active }) => (active ? "#000" : "transparent")};
  transition: all 0.2s;

  &:hover {
    color: ${({ active }) => (active ? "#fff" : "#000")};
  }
`;
