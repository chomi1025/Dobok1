import styled from "@emotion/styled";

interface OrderInfoProps {
  flex?: number;
  align?: "left" | "center" | "right";
}

export const Section = styled.section`
  font-size: 15px;
  position: relative;
`;

export const InquiryButton = styled.button`
  position: absolute;
  top: -49px;
  right: 0;
  background-color: #1e40af;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  padding: 10px 15px;
  color: white;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #333;
  border-bottom: 1px solid #ddd;

  > div {
    padding: 10px 0;
    font-weight: 700;
  }
`;

export const Body = styled.div``;

export const Row = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 20px 0;

  a {
    text-decoration: underline;
  }
`;

export const Info = styled.div<OrderInfoProps>`
  flex: ${(props) => props.flex || 1};
  text-align: ${(props) => props.align || "center"};
  display: flex;
  justify-content: ${(props) =>
    props.align === "left"
      ? "flex-start"
      : props.align === "right"
        ? "flex-end"
        : "center"};
  align-items: center;
`;
