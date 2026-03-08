"use client";
import styled from "@emotion/styled";

export const Inner = styled.div`
  padding-bottom: 300px;
  flex: 1;

  h2 {
    margin-bottom: 40px;
    font-size: 32px;
  }
`;

export const Section = styled.section<{ variant: string }>`
  margin-bottom: 80px;

  h3 {
    font-size: 26px;
  }
  hr {
    border: none;
    height: 1px;
    background-color: #333;
    margin: 15px 0 25px;
  }

  ${({ variant }) =>
    variant === "ProductImage" &&
    `
      min-height: 645px;
    `}

  ${({ variant }) =>
    variant === "ProductInfo" &&
    `
      min-height: 525px;
    `}

         ${({ variant }) =>
    variant === "productPricing" &&
    `
      min-height: 260px;
    `}

         ${({ variant }) =>
    variant === "productDescription" &&
    `
      min-height: 308px;
    `}
`;

export const SmallSection = styled.div<{ variant: string }>`
  margin-bottom: 35px;

  label {
    display: block;
    margin-bottom: 15px;
    font-weight: 600;
  }

  h4 {
    margin-bottom: 15px;
  }

  input {
    padding: 15px 20px;
  }

  ${({ variant }) =>
    variant === "thumbnail" &&
    `
      label {
        background-color: #d9d9d9;
        width: 212px;
        height: 212px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
        color: #555;
      }
    `}

  ${({ variant }) =>
    variant === "detail" &&
    `

      label {
        width:120px;
        height:40px;
        display : flex;
        justify-content:center;
        align-items : center;
        border:1px solid #D1D5DB;
        color:#6B7280;
        font-size:14px;
        cursor : pointer;
      }

      >span{
        font-size:14px;
        color : #C1272D;
        margin-left:17px;
      }
    `}


  ${({ variant }) =>
    variant == "ProductName" &&
    `
      input {
        min-width: 445px;
      }
    `}

  ${({ variant }) =>
    variant == "category" &&
    `
    display: flex;
    flex-direction: column;

      >label{
        display : block;
        width : 100%;
      }

      >div{
        display: flex;
        gap : 6px;

        >div{

          width:170px;
          display :inline-block;
          position:relative;

          >select{
          color : #555;
          font-size : 14px;
            width:100%;
            padding:15px 20px;
          }

          >span{
            font-size : 11px;
            position:absolute;
            top:50%;
            transform :translateY(-50%);
            right:10px;
          }
        }
      }
    `}

      ${({ variant }) =>
    variant == "stock" &&
    `
      gap : 20px;
    `}

    ${({ variant }) =>
    variant == "status" &&
    `
      display : flex;
      flex-direction : column;

      >div {
        display : flex;
        gap : 10px;
      }
    `}

    ${({ variant }) =>
    variant == "origin" &&
    `
      >input {
        border : 1px solid #DCDCDC;
      }
    `}

      ${({ variant }) =>
    variant == "matter" &&
    `
      >textarea {
      border : 1px solid #DCDCDC;
      padding : 15px 20px;
        min-width : 310px;
      }
    `}

      ${({ variant }) =>
    variant == "Description" &&
    `
      >textarea {
      width : 100%;
      min-height : 200px;
      border : 1px solid #DCDCDC;
      padding : 15px 20px;
        min-width : 310px;
      }
    `}
`;

export const StatusButton = styled.button<{ active: boolean }>`
  padding: 7px 12px;
  font-size: 15px;
  border-radius: 20px;
  border: ${(props) => (props.active ? "" : "1px solid #ddd")};
  background: ${(props) => (props.active ? "#333" : "")};
  color: ${(props) => (props.active ? "white" : "#333")};
`;

export const OptionsTitleWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

export const OptionsButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const OptionsButton = styled.button<{ active: boolean }>`
  padding: 7px 12px;
  font-size: 15px;
  border-radius: 20px;
  border: ${(props) => (props.active ? "" : "1px solid #ddd")};
  background: ${(props) => (props.active ? "#333" : "")};
  color: ${(props) => (props.active ? "white" : "#333")};
`;

export const SingleWrapper = styled.section`
  > div {
    display: flex;

    > div {
      label {
        font-weight: 600;
        display: block;
        margin-bottom: 15px;
      }

      > input {
        padding: 15px 20px;
      }
    }
  }
`;

export const PriceWrapper = styled.div`
  display: flex;
  gap: 20px;
  > div {
    label {
      font-weight: 600;
      display: block;
      margin-bottom: 15px;
    }

    > input {
      padding: 15px 20px;
    }
  }
`;

export const OptionWrapper = styled.section``;

export const AddOptionButton = styled.button`
  margin-top: 10px;
  font-size: 14px;
  background-color: #1e40af;
  color: white;
  border-radius: 9999px;
  padding: 12px 15px;
`;

export const DndInner = styled.div`
  border: 1px solid #ddd;
  display: inline-grid;
  padding: 15px 20px;
  border-radius: 5px;
  gap: 8px;
  transition: all 0.2s ease;
`;

export const NoImageBox = styled.div`
  display: inline-grid;
  font-size: 15px;
  min-height: 100px;
  text-align: center;
  grid-template-columns: 520px;
  align-items: center;
  gap: 15px;
  border-radius: 6px;
  background: #fff;
  padding: 4px;
`;

export const HiddenOption = styled.option`
  color: #999;
`;

export const ButtonWrapper = styled.div<{ submit?: boolean }>`
  display: flex;
  justify-content: center;
  gap: 10px;

  button {
    color: #333;
    border-radius: 4px;
    padding: 12px 15px;

    &:first-of-type {
      border: 1px solid #ddd;
    }

    &:last-of-type {
      color: white;
      background-color: #1e40af;
    }
  }
`;
