import styled from "@emotion/styled";

export const Footer = styled.footer`
  font-weight: 500;
  background-color: #c1272d;
  color: white;
  padding: 25px 0 30px;
`;

export const Inner = styled.footer`
  width: 1200px;
  margin: 0 auto;
  position: relative;
`;

export const Footer_links = styled.nav`
  ul {
    display: flex;
    gap: 40px;
    font-size: 15px;
  }

  margin-bottom: 35px;
`;

export const Address = styled.address`
  font-size: 12px;

  div {
    display: flex;
    gap: 20px;

    &:nth-of-type(2) {
      margin: 8px 0;
    }
  }
`;

export const Small = styled.small`
  display: inline-block;
  font-size: 12px;
  margin-top: 30px;
`;

export const Right_Wrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  text-align: right;
  transform: translateY(-50%);

  div:first-of-type {
    display: flex;
    justify-content: right;
    align-items: center;
    gap: 8px;

    p {
      font-size: 15px;
      font-weight: 600;
      display: flex;
    }

    a {
      display: block;
    }
  }

  strong {
    display: inline-block;
    font-weight: 700;
    margin: 15px 0 35px;
  }

  div:last-of-type {
    font-size: 12px;
    font-weight: 600;
    p:first-of-type {
      margin-bottom: 8px;
    }
  }
`;
