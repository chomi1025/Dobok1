import styled from "@emotion/styled";

// 사이드바
export const Inner = styled.aside`
  width: 212px;

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

//회원탈퇴
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
// 공통

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
