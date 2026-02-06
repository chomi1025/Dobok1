import styled from "@emotion/styled";

export const Wrapper = styled.div`
  margin: 0 auto;
  flex: 1;
  padding-bottom: 300px;

  > div {
    max-width: 900px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #333;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 32px 0;
`;

export const Card = styled.section`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 24px;
  background: #fff;

  select {
    padding: 0 15px;
  }

  textarea {
    padding: 10px 15px;
  }
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  row-gap: 12px;
`;

export const Label = styled.span`
  color: #777;
  font-size: 14px;
`;

export const Value = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const Address = styled.p`
  font-size: 14px;
  line-height: 1.6;
`;

/* 상품 카드 */

export const ProductCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #ddd;

  &:last-of-type {
    border-bottom: none;
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const ProductName = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 6px;
`;

export const ProductMeta = styled.p`
  font-size: 13px;
  color: #777;
`;

export const ProductPrice = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-top: 8px;
`;

/* 가격 */

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 8px;

  &.total {
    font-size: 16px;
    font-weight: 700;
    margin-top: 16px;
  }
`;

/* 버튼 */

export const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

export const Button = styled.button<{ primary?: boolean }>`
  flex: 1;
  height: 48px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid #ccc;
  background: #fff;
  color: #000;
`;

export const PrimaryButton = styled.button`
  flex: 1;
  height: 48px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  border: none;
  background: #000;
  color: #fff;

  transition: background 0.2s ease;

  &:hover {
    background: #333; // 호버 시 조금 밝게
  }

  &:active {
    background: #111; // 클릭 시 살짝 어둡게
  }
`;
