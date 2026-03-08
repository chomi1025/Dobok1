import styled from "@emotion/styled";

export const Inner = styled.section`
  width: 212px;
  margin-right: 20px;
  position: sticky;
  align-self: flex-start;
  top: 20px;

  h2 {
    display: block;
    font-size: 36px;
    margin-bottom: 30px;
  }
`;

export const Navigation = styled.nav`
  > ul {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

export const List = styled.li<{ active: boolean }>`
  font-weight: ${(props) => (props.active ? "800" : "400")};
  color: ${(props) => (props.active ? "#333" : "#666")};
`;
