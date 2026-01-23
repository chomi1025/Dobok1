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
    /* span 자체는 비워두고 before로만 표시 */
    &.withSeparator::before {
      content: ">";
      margin: 0 4px; // 좌우 여백
      color: #666;
    }
  }
`;

export const TabMenuWrapper = styled.nav`
  ul {
    display: flex;
    justify-content: center;
    gap: 10px;

    li {
      border: 1px solid #ddd;
      border-radius: 20px;
      color: #888;
      font-size: 15px;
      transition: border-color 0.25s ease, color 0.25s ease;

      a {
        display: inline-block;
        padding: 7px 12px;
      }

      &:hover {
        border: 1px solid #222;
        color: #222;
      }

      &.activeTab {
        border-color: #222;
        background-color: #222;
        color: white;
      }
    }
  }
`;

export const ProductList = styled.div`
  margin-top: 40px;
`;
