import styled from "@emotion/styled";

export const TabButton = styled.button<{ active: boolean }>`
  padding: 7px 12px;
  font-size: 15px;
  border-radius: 20px;
  border: ${(props) => (props.active ? "" : "1px solid #ddd")};
  background: ${(props) => (props.active ? "#333" : "")};
  color: ${(props) => (props.active ? "white" : "#333")};
`;
