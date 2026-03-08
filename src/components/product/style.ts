import styled from "@emotion/styled";

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 70px;
  column-gap: 32px;

  /* 태블릿 */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* 모바일 화면 (예: 600px 이하) */
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }

  li {
    width: 100%; /* 알아서 grid 비율에 맞춰짐 */
    img {
      width: 276px;
      height: 276px;
      background-color: black;
    }
  }
`;

export const Image_Wrapper = styled.figure`
  margin: 0; /* 🚩 브라우저 기본 마진 제거! */
  padding: 0; /* 혹시 모를 패딩도 제거 */
  width: 100%;
  position: relative;
  aspect-ratio: 1 / 1; /* 🚩 가로 세로 비율을 1:1로 강제 고정 */

  > img {
    object-fit: cover;
  }

  > span {
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
