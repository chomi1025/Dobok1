import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";

export const StatusTabs = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding: 15px 20px;
  background-color: #f9f9f9;
  border-radius: 12px;

  ul {
    display: flex;
    gap: 8px;
    background: #fff;
    border-radius: 8px;
    padding: 4px;
    border: 1px solid #eee;
  }
`;

export const Tab = styled.li<{ active: boolean }>`
  width: 100px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${({ active }) => (active ? "600" : "400")};
  color: ${({ active }) => (active ? "#fff" : "#666")};
  background-color: ${({ active }) => (active ? "#000" : "transparent")};
  transition: all 0.2s;

  &:hover {
    color: ${({ active }) => (active ? "#fff" : "#000")};
    background-color: ${({ active }) => (active ? "#000" : "#f0f0f0")};
  }
`;

type FilterStatus = "전체" | "답변대기" | "답변완료";

interface Props {
  statusFilter: FilterStatus;
  setStatusFilter: Dispatch<SetStateAction<FilterStatus>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export default function StatusTab({
  statusFilter,
  setStatusFilter,
  setCurrentPage,
}: Props) {
  return (
    <StatusTabs>
      <ul>
        {(["전체", "답변대기", "답변완료"] as const).map((status) => (
          <Tab
            key={status}
            active={statusFilter === status}
            onClick={() => {
              setStatusFilter(status);
              setCurrentPage(0);
            }}
          >
            {status}
          </Tab>
        ))}
      </ul>
    </StatusTabs>
  );
}
