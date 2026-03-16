import styled from "@emotion/styled";

export const Inner = styled.section`
  padding: 100px 0 250px;
  width: 650px;
  margin: 0 auto;
  position: relative;

  select {
    color: #444;
  }
  input {
    color: #444;
    border-radius: 4px;
  }
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
export const Error_Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  p {
    margin-left: 10px;
    font-size: 13px;
    color: red;
  }

  button {
    position: absolute;
    right: 0;
    color: white;
    background-color: #444;
    padding: 5px 7px;
    font-size: 12px;
    border-radius: 3px;
    font-weight: 300;
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

  fieldset {
    legend {
      font-size: 0; /* 글자 안보이게 */
      width: 0; /* 영역 최소화 */
      height: 0;
      padding: 0;
      margin: 0;
      border: 0;
      overflow: hidden;
      position: absolute;
      clip: rect(0 0 0 0);
    }
  }
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
      label {
        display: block;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
`;

export const Phone = styled.div`
  div:last-of-type {
    display: grid;
    color: #444;

    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    align-items: center;

    input {
      color: #444;
    }

    > button {
      display: flex;
      justify-content: center;
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
  //pointer-events: none;
  font-size: 12px;
  color: #666;
`;

export const address = styled.fieldset`
  margin-bottom: 30px;

  > div {
    display: flex;

    > input {
      padding: 12px 20px;
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

  > input {
    padding: 12px 20px;
    width: 100%;

    &:nth-of-type(1) {
      margin: 10px 0;
    }
  }
`;

export const PersonalInfo = styled.fieldset`
  input {
    width: 100%;
    padding: 12px 20px;
  }

  .field {
    margin-bottom: 30px;
  }
`;

export const AccountInfo = styled.fieldset`
  input {
    width: 100%;
    padding: 12px 20px;
  }

  .field {
    margin-bottom: 30px;
  }
`;
export const EmailInfo = styled.fieldset`
  input {
    width: 100%;
    padding: 12px 20px;
  }
  .field {
    margin-bottom: 30px;
  }
`;

export const Email = styled.div`
  > div:nth-of-type(2) {
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
  width: 100%;

  label {
    font-size: 14px;
  }

  > div {
    display: flex;
    width: 100%;
    gap: 12px;
    align-items: center;

    > span {
      display: flex;
      align-items: center;
    }
  }
`;

export const Input = styled.span`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;

  &:nth-of-type(1) {
    flex: 1.5;
  }

  input {
    background-color: #f9fafb;
    width: 100%;
    min-width: 0;
    padding: 12px 20px;
    box-sizing: border-box;
  }

  &:nth-of-type(1)::after {
    content: "년";
    margin-left: 4px;
    white-space: nowrap;
  }
  &:nth-of-type(2)::after {
    content: "월";
    margin-left: 4px;
    white-space: nowrap;
  }
  &:nth-of-type(3)::after {
    content: "일";
    margin-left: 4px;
    white-space: nowrap;
  }
`;

export const Line2 = styled.span`
  display: block;
  width: 650px;
  height: 1px;
  background-color: #ddd;
  margin: 50px 0 60px;
`;
