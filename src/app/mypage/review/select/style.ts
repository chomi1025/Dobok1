import styled from "@emotion/styled";

/* 전체 래퍼 */
export const Wrapper = styled.div`
  max-width: 720px;
  margin: 0 auto 300px;
  padding: 32px 20px 80px;
  background: #f9fafb;
`;

/* 타이틀 */
export const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
`;

/* 카드 공통 */
export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 14px;
  padding: 20px;
`;

/* 카드 제목 */
export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
`;

/* 주문정보 */
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr;
  align-items: center;
  row-gap: 12px;
`;

export const Label = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

export const Value = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

/* 구분선 */
export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 24px 0;
`;

/* 상품 카드 */
export const ProductCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #f3f4f6;
    transform: translateY(-1px);
  }

  & + & {
    margin-top: 12px;
  }

  img {
    border-radius: 10px;
    border: 1px solid #e5e7eb;
  }
`;

/* 상품 정보 */
export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ProductName = styled.span`
  font-size: 15px;
  font-weight: 500;
  line-height: 1.3;
`;

/* 리뷰 힌트 */
export const ReviewHint = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #2563eb;
`;

/* 비어있을 때 */
export const EmptyBox = styled.div`
  padding: 48px 0;
  text-align: center;
  font-size: 14px;
  color: #9ca3af;
`;
