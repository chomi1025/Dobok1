import styled from "@emotion/styled";

export const Inner = styled.div`
  flex: 1;

  > h2 {
    font-size: 32px;
    margin-bottom: 30px;
  }

  > section {
    margin-bottom: 35px;

    > h3 {
      font-size: 20px;
      margin-bottom: 20px;
    }

    > ul {
      > li {
        &:not(:last-of-type) {
          margin-bottom: 15px;
        }

        > ul {
          > li {
            padding-left: 10px;
            margin-top: 5px;
          }
        }
      }
    }
  }
`;
