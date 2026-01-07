import styled from "@emotion/styled";

export const TopHeader = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconGroup = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 15px;
  margin: 30px 35px;
`;

export const BottomHeader = styled.nav`
  width: 100%;
  height: 65px;

  > ul {
  }

  > ul > li:first-of-type:hover > ul > nav {
    display: flex;
  }
`;

export const Navigation = styled.ul`
  height: 100%;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

export const NavLink = styled.a<{ isFirst?: boolean }>`
  position: relative;
  text-decoration: none;
  padding: 4px 0px;
  transition: color 0.2s ease;
  font-weight: 700;

  color: ${(props) => (props.isFirst ? "#c1272d" : "#555")};

  &:hover {
    color: ${(props) => (props.isFirst ? "#c1272d" : "#222")};
  }

  /* 밑줄 */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 100%;
    background-color: ${(props) => (props.isFirst ? "#c1272d" : "#222")};
    transform: scaleX(0); /* 처음은 안보이게 */
    transform-origin: left; /* 왼쪽에서 시작 */
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1); /* 호버 시 전체 길이로 확장 */
  }
`;

export const Li = styled.li<{ isFirst?: boolean }>`
  display: flex;

  ${({ isFirst }) =>
    isFirst &&
    `
    &:hover > nav {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      padding: 50px 0 76px;
      justify-content: center;
  gap: 84px;
  background-color: white;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.07);
  display: flex;

    }
  `}
`;

export const Menu = styled.nav<{ isFirst?: boolean }>`
  display: none;

  > ul {
    display: block;
  }
`;

export const B_category = styled.li`
  font-size: 18px;
  color: #222;
  font-weight: 700;
  position: relative;
`;

export const S_Category = styled.li`
  position: relative;
  margin-bottom: 15px;
  color: #555;
  &:hover {
    color: #222;
  }
`;

export const line = styled.div`
  width: 110px;
  height: 1px;
  background-color: #ddd;
  margin: 13px 0 17px;
`;
