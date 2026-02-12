import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 1040px;
  margin: 0 auto;
  padding: 90px 0 300px;
`;

export const SectionHeader = styled.section`
  margin-bottom: 75px;

  h2 {
    text-align: center;
    margin-bottom: 15px;
  }
`;

export const PolicyBox = styled.section`
  margin-bottom: 150px;

  > div {
    width: 100%;
    height: 180px;
    padding: 25px 30px;
    border: 1px solid #ddd;
    margin-bottom: 15px;
    overflow-y: auto;
    box-sizing: border-box;

    h4 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    hr {
      border: none;
      height: 1px;
      background-color: #888;
      margin: 10px 0 20px;
    }
  }
`;

// 약관 리스트 스타일링
export const TermsList = styled.ul`
  list-style: none;
  padding: 0;

  > li {
    margin-bottom: 15px;
    font-size: 14px;
    font-weight: 700;

    // 하위 리스트 (세부 항목)
    ul {
      list-style: none;
      padding-left: 10px;
      margin-top: 8px;

      li {
        font-size: 13px;
        font-weight: 400;
        color: #666;
        line-height: 1.6;
      }
    }

    // 하위 문장 (보유 기간 등)
    p {
      font-size: 13px;
      font-weight: 400;
      color: #666;
      margin-top: 8px;
      padding-left: 10px;
    }
  }
`;

// 체크박스 영역
export const ConsentWrapper = styled.p`
  font-size: 13px;
  display: flex;
  align-items: center;

  span {
    color: #ff0000;
    font-weight: bold;
  }

  input {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    cursor: pointer;
  }

  label {
    cursor: pointer;
  }
`;

export const ProductListWrapper = styled.section`
  h4 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #222;
  }
`;

export const OrdererInfoWrapper = styled.section`
  margin-top: 70px;
  border-bottom: 1px solid #ddd;

  fieldset {
    border: none;

    hr {
      border: none;
      width: 100%;
      height: 1px;
      background-color: #333;
      margin-bottom: 20px;
    }
  }

  legend {
    width: 100%;
    font-size: 20px;
    font-weight: 700;
    color: #222;
    padding-bottom: 10px;
  }
`;

export const InputRow = styled.div`
  display: flex;
  align-items: center;
  padding-left: 30px;
  padding-bottom: 20px;

  label {
    width: 120px;
    font-size: 15px;
    color: #222;
    font-weight: 500;
  }

  input {
    flex: 1;
    max-width: 400px;
    height: 35px;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    padding: 0 16px;
    font-size: 15px;
    transition: all 0.2s;

    &::placeholder {
      color: #ccc;
    }

    &:focus {
      outline: none;
      border-color: #333;
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
    }
  }
`;
