/* ====== Emotion Styled Components ====== */

import styled from "@emotion/styled";

export const Container = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 16px;
`;

export const Top = styled.div`
  text-align: center;
`;

export const Header = styled.div`
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-top: 12px;
`;

export const Breadcrumb = styled.nav`
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  color: #666;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    &.withSeparator::before {
      content: ">";
      margin: 0 4px;
      color: #666;
    }
  }
`;

export const ProductList = styled.div`
  margin-top: 40px;
`;
