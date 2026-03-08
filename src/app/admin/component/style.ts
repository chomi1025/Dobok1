import styled from "@emotion/styled";

export const Inner = styled.section`
  position: sticky;
  align-self: flex-start;
  top: 20px;
  width: 212px;
  margin-right: 20px;

  > h1 {
    font-size: 36px;
    margin-bottom: 30px;
    color: #111;
  }

  > nav {
    > ul {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }
`;

export const List = styled.li<{ active: boolean }>`
  font-size: 15px;
  color: ${(props) => (props.active ? "#333" : "#555")};
  font-weight: ${(props) => (props.active ? "700" : "400")};
  text-decoration: ${(props) => (props.active ? "underline" : "")};
  text-underline-offset: 3px;
`;
