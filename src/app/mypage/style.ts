import styled from "@emotion/styled";

export const Inner = styled.main`
  margin: 0 auto;
  width: 1140px;
  padding-top: 80px;
  display: flex;
  justify-content: space-between;

  > section {
    width: 908px;
  }
`;

export const Contents = styled.section<{
  isEdit?: boolean;
  withDraw?: boolean;
}>`
  padding-bottom: 300px;

  h2 {
    font-size: 24px;
    padding-bottom: ${(props) =>
      props.isEdit || props.withDraw ? "20px" : ""};
    border-bottom: ${(props) =>
      props.isEdit || props.withDraw ? "1px solid #333" : ""};
    margin-bottom: ${(props) =>
      props.isEdit || props.withDraw ? "90px" : "40px"};
  }
`;

export const WithDraw = styled.form`
  width: 660px;
  display: block;
  margin: 55px auto 90px;
  padding: 60px 0 75px;
  border: 1px solid #ddd;

  section:first-of-type {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 65px;

    p {
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 28px;
    }

    ul {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 14px;
      color: #555;

      li {
        &::before {
          content: "·";
          margin-right: 5px;
        }

        &:not(:last-of-type) {
          margin-bottom: 10px;
        }
      }
    }
  }

  fieldset {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 60px;

    legend {
      text-align: center;
      padding: 15px 0;
      margin-bottom: 30px;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      font-size: 20px;
      font-weight: 700;
    }

    ul {
      li {
        &:not(:last-of-type) {
          margin-bottom: 8px;
        }

        label {
          display: flex;
          align-items: center;
          transition: all 0.2s ease;

          input {
            display: none;
          }

          /* 네모 박스 */
          .box {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            border: 2px solid #999;
            border-radius: 4px;
            position: relative;
            flex-shrink: 0;
          }

          .text {
            font-size: 14px;
          }

          /* hover */
          &:hover {
            background: #f7f7f7;
          }

          /* 선택됨 */
          input:checked + .box {
            border-color: #333;
            background: #333;
          }

          input:checked + .box::after {
            content: "";
            position: absolute;
            inset: 5px;
            background: #fff;
          }
        }
      }
    }
  }

  section:last-of-type {
    width: 350px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    label:first-of-type {
      margin-bottom: 12px;
      font-size: 15px;

      > input {
        margin-right: 10px;
      }
    }

    > input {
      padding: 12px 0 12px 15px;
      margin-bottom: 20px;
    }

    label:nth-of-type(2) {
      font-size: 14px;
      margin-bottom: 15px;
      display: flex;
    }

    > button {
      width: 100%;
      height: 60px;
      border-radius: 5px;
      background-color: #333;
      color: white;
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 70px;
  padding: 0;

  .pagination {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .page-item {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #555; /* 🔹 기본 숫자 색상 */

    border: 1px solid #ccc;

    border-radius: 4px;
    background: #fff;
  }

  .page-link {
    display: flex;
    padding: 6px 10px;
    border-radius: 4px;
  }

  .page-link:hover {
    background: #f0f0f0;
  }

  .active .page-link {
    display: flex;
    align-items: center;
    font-weight: bold;
    color: #fff; /* 🔹 active 글자색 */
    background: #333; /* 🔹 active 배경색 */
    height: 100%;
  }

  .prev .page-link img,
  .next .page-link img {
    width: 24px; // 원하는 화살표 크기
    height: 24px;
    object-fit: contain;
  }

  .page-item.disabled .page-link {
    opacity: 0.5;
    pointer-events: none;
    cursor: default;
  }
`;

// style.ts
export const StatusActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const BaseButton = styled.button`
  width: 80px;
  padding: 8px 0;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
`;

export const PrimaryButton = styled(BaseButton)`
  background: #1e3a8a;
  color: #fff;
`;

export const SecondaryButton = styled(BaseButton)`
  border: 1px solid #ddd;
  color: #555;
`;
