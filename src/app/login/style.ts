import styled from "@emotion/styled";
import content from "./../../../node_modules/next/image-types/global.d";

export const Inner = styled.section`
  text-align: center;
  padding: 100px 0 250px;
  width: 650px;
  margin: 0 auto;
`;

export const Title_Wrapper = styled.div`
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

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 60px 0 70px;
`;

export const Form = styled.form`
  display: flex;
  margin: 0 auto;
  width: 400px;
`;

export const Field = styled.div`
  text-align: left;
  width: 100%;

  > div:first-of-type {
    margin-bottom: 25px;
  }

  > div > label {
    display: block;
    font-size: 14px;
    color: #333;
    font-weight: 500;
    margin-bottom: 10px;
  }

  > button {
    width: 100%;
    padding: 20px 0;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
    background-color: #444;
    color: white;
    margin-bottom: 12px;
  }

  ul {
    display: flex;
    justify-content: right;
    font-size: 14px;
    font-weight: 300;
    margin: 18px 0 26px;

    li:first-of-type {
      position: relative;
      margin-right: 20px;
    }

    li:first-of-type::after {
      content: "|";
      display: flex;
      position: absolute;
      top: 0;
      right: -13px;
    }
  }
`;

export const Input = styled.input`
  border: 1px solid #ddd;
  padding: 11px 15px;
  width: 100%;
`;

export const LinkButton = styled.a`
  width: 100%;
  padding: 20px 0;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  display: block;
  border: 1px solid #444;
  color: #444;
  text-align: center;
`;
