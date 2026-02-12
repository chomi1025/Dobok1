import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 1040px;
  margin: 0 auto;
  padding: 90px 0 300px;

  h2 {
    text-align: center;
    margin-bottom: 15px;
  }
`;

export const Texts = styled.div`
  padding-top: 170px;
  text-align: center;
  margin: 0 auto;

  h3 {
    font-size: 28px;
    font-weight: 700;
  }

  p {
    padding-top: 22px;
  }
`;

export const Box = styled.div`
  padding-top: 60px;
  display: flex;
  justify-content: space-between;

  p {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    width: 480px;
    height: 80px;
    padding-left: 30px;
  }
`;

export const Buttons = styled.div`
  padding-top: 85px;
  display: flex;
  justify-content: center;
  gap: 15px;

  button {
    width: 160px;
    height: 55px;
    border-radius: 4px;

    &:first-of-type {
      border: 1px solid #ddd;
    }

    &:last-of-type {
      background-color: #333;
      color: white;
    }
  }
`;
