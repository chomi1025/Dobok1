import styled from "@emotion/styled";

export const Inner = styled.div`
  flex: 1;

  h2 {
    font-size: 32px;
    margin-bottom: 30px;
  }
`;

export const DashboardCards = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  > section {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 150px;
    width: calc(100% / 4);
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 4px;

    > h3 {
      display: flex;
      flex-direction: column;
      align-items: center;

      > a {
        padding-top: 8px;
        font-size: 48px;
        font-weight: 700;
        text-decoration: underline;
      }
    }
  }
`;
