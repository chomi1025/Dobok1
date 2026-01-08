import styled from "@emotion/styled";

export const Inner = styled.section`
  padding: 100px 0 250px;
  width: 650px;
  margin: 0 auto;
  position: relative;
`;

export const Title_Wrapper = styled.div`
  text-align: center;

  h2 {
    color: #333;
    font-size: 32px;
    font-weight: 700;
  }

  p {
    margin-top: 8px;
    color: #666;
    font-size: 14px;
  }
`;

export const Line = styled.span`
  display: block;
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 60px 0 70px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const Signup_Button = styled.button`
  width: 400px;
  height: 60px;
  background-color: #444;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  margin-top: 25px;
`;

export const Form_Inner = styled.div`
  width: 400px;

  > fieldset {
    > div {
      margin-bottom: 30px;
      label {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
`;

export const Phone = styled.div`
  > div {
    display: flex;
    gap: 5px;

    input:first-of-type {
      width: 100px;
    }

    input:last-of-type {
      width: 100px;
    }

    > button {
      display: flex;
      padding: 13px 20px;
      background-color: #444;
      border-radius: 4px;
      color: white;
      font-weight: 500;
      font-size: 12px;
    }
  }
`;

export const Phone_Selectwrapper = styled.div`
  position: relative;
  width: 90px;
  display: flex;

  select {
    border: 1px solid #ddd;
    width: 100%;
    padding-left: 15px;
    appearance: none;
    background-image: url("https://firebasestorage.googleapis.com/v0/b/myfirebase-34805.appspot.com/o/Keyboard%20arrow%20down.png?alt=media&token=b4055887-17dc-4dab-ac01-26e699caf8db");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 24px;
  }
`;

export const Arrow = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none; /* ⭐ 중요 */
  font-size: 12px;
  color: #666;
`;

export const address = styled.div`
  > div {
    display: flex;

    > input {
      width: 133px;
    }

    > button {
      display: flex;
      padding: 13px 20px;
      background-color: #444;
      border-radius: 4px;
      color: white;
      font-weight: 500;
      font-size: 12px;
      margin-left: 5px;
    }
  }

  > input:nth-of-type(1) {
    margin: 10px 0;
  }
`;

export const Email = styled.div`
  > div {
    display: flex;
    justify-content: space-between;

    > input {
      width: 180px;
    }
  }
`;

export const Email_Selectwrapper = styled.div`
  display: flex;
  position: relative;
  width: 180px;

  &::before {
    content: "@";
    position: absolute;
    top: 50%;
    left: -27px;
    transform: translateY(-50%);
  }

  select {
    border: 1px solid #ddd;
    width: 100%;
    padding-left: 15px;
    appearance: none;
    background-image: url("https://firebasestorage.googleapis.com/v0/b/myfirebase-34805.appspot.com/o/Keyboard%20arrow%20down.png?alt=media&token=b4055887-17dc-4dab-ac01-26e699caf8db");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 24px;
  }
`;

export const Birthday = styled.div`
  > div {
    display: flex;

    > span {
      display: flex;
      align-items: center;

      input {
        padding: 11px 8px;
        text-align: right;
      }

      &:first-of-type {
        width: 100px;

        input {
          width: 100%;
          font-size: 14px;
        }

        &::after {
          content: "년";
          margin-left: 8px;
        }
      }

      &:nth-of-type(2) {
        margin-left: 13px;
        &::after {
          content: "월";
          margin-left: 8px;
        }

        input {
          width: 50px;
        }
      }

      &:nth-of-type(3) {
        margin-left: 13px;

        &::after {
          content: "일";
          margin-left: 8px;
        }

        input {
          width: 50px;
        }
      }
    }
  }
`;

export const Line2 = styled.span`
  display: block;
  width: 650px;
  height: 1px;
  background-color: #ddd;
  margin: 30px 0 60px;
`;

export const Check_Wrapper = styled.div`
  > fieldset {
    > label {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
      font-size: 14px;

      > input {
        width: 20px;
        height: 20px;
        margin-right: 8px;
      }
    }
  }
`;
