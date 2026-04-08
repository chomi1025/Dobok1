import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

interface OrderInfoProps {
  flex?: number;
  align?: "left" | "center" | "right";
  hideLabel?: boolean;
}

export const skeletonGradient = keyframes`
  0% { background-color: rgba(165, 165, 165, 0.1); }
  50% { background-color: rgba(165, 165, 165, 0.3); }
  100% { background-color: rgba(165, 165, 165, 0.1); }
`;

const rem = (px: number, base: number = 16): string => {
  return `${px / base}rem`;
};

export const Section = styled.section`
  flex: 1;
  font-size: ${rem(15)};
  position: relative;

  @media (max-width: 767px) {
    border-top: 1px solid #333;
  }
`;

export const InquiryButton = styled.button`
  position: absolute;
  top: -49px;
  right: 0;
  background-color: #1e40af;
  border-radius: ${rem(4)};
  font-size: ${rem(14)};
  font-weight: 700;
  padding: ${rem(10)} ${rem(15)};
  color: white;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #333;
  border-bottom: 1px solid #ddd;

  @media (max-width: 767px) {
    display: none;
  }

  > div {
    padding: ${rem(10)} 0;
    font-weight: 700;
  }
`;

export const Body = styled.div`
  .common-skeleton-bar {
    width: 80%;
    height: ${rem(20)};
    border-radius: ${rem(4)};
    animation: ${skeletonGradient} 1.5s infinite ease-in-out;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: ${rem(10)} 0;
  min-height: ${rem(50)};

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${rem(10)};
    padding: ${rem(20)} 0;
  }
`;

export const Info = styled.div<OrderInfoProps>`
  flex: ${(props) => props.flex || 1};
  text-align: ${(props) => props.align || "center"};
  display: flex;
  align-items: center;
  gap: ${rem(20)};
  justify-content: ${(props) => {
    if (props.align === "left") return "flex-start";
    if (props.align === "right") return "flex-end";
    return "center";
  }};

  &.empty-text {
    padding: ${rem(40)} 0;
    color: #888;
  }

  @media (max-width: 767px) {
    width: 100%;
    flex: none !important;
    display: flex;
    justify-content: flex-end;
    gap: 0;
    &::before {
      content: attr(data-label);
      font-weight: 700;

      display: ${(props) => (props.hideLabel ? "none" : "block")};
    }

    ${(props) =>
      props.hideLabel &&
      `
      justify-content: flex-end;
      & > div, & > p { text-align: left; }
    `}
  }
`;
