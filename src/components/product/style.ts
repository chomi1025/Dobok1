import styled from "@emotion/styled";

export const Image_Wrapper = styled.figure`
  position: relative;
  span {
    position: absolute;
    width: 32px;
    height: 32px;
    bottom: 10px;
    right: 12px;
    background-color: #d0d0d0;
    border-radius: 60px;
    background-image: url("https://ybzfvjcmeedwjrpbdmgd.supabase.co/storage/v1/object/sign/Dobok/ph_bag-light.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NTA4MjBkYi00ZDg1LTRiNzgtYWNmYS1hY2MyZjM4Yzg4YjIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJEb2Jvay9waF9iYWctbGlnaHQucG5nIiwiaWF0IjoxNzY4MjQzMTEwLCJleHAiOjE3OTk3NzkxMTB9.ojMXgxligrHzLTrT-nBAEh24MtMhGeLCvzw4dEWL8Tw");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 24px 24px;
  }
`;

export const Info_Wrapper = styled.div`
  padding-top: 15px;

  p {
    font-size: 16px;
    color: #333;
    font-weight: 700;
    margin-bottom: 6px;
  }
`;

export const Product_Title = styled.p``;

export const Product_price = styled.div`
  display: flex;
  align-items: center;

  small {
    font-size: 13px;
    color: #bbb;
    text-decoration: line-through;
    margin-left: 7px;
  }
`;

export const Sale = styled.span`
  font-size: 24px;
  margin-right: 7px;
  color: #b72e2e;
  font-weight: 700;
`;

export const Price = styled.span`
  color: #222;
  font-size: 20px;

  strong {
    font-size: 24px;
    margin-right: 4px;
  }
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 70px;
  column-gap: 32px;

  li {
    img {
      width: 276px;
      height: 276px;
      background-color: black;
    }
  }
`;
