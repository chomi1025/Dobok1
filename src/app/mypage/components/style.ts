import styled from "@emotion/styled";

// 사이드바
export const Inner = styled.aside<{ isEdit: boolean }>`
  width: 212px;
  margin-right: 20px;

  h2 {
    font-size: 36px;
    margin-bottom: ${(props) => (props.isEdit ? "90px" : "30px")};
  }

  nav {
    ul {
      &:not(:nth-of-type(3)) {
        margin-bottom: 30px;
      }

      li {
        font-size: 15px;
        color: #555;
        margin-bottom: 12px;

        > a {
          display: block;
          cursor: pointer;
        }
      }

      li.title {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 15px;
        color: #333;
      }

      li.active {
        font-weight: 700;
        color: #333;
        text-decoration: underline;
      }
    }
  }
`;
