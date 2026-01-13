import styled from "@emotion/styled";

export const Inner = styled.section`
  width: 1200px;
  margin: 0 auto;
`;

export const Title_Wrapper = styled.header`
  padding-top: 70px;
  text-align: center;
  padding-bottom: 40px;

  h2 {
    font-size: 32px;
    font-weight: 700;
  }
`;

export const Bread_crumb = styled.nav`
  margin-bottom: 12px;

  ol {
    font-size: 12px;
    color: #888;

    li {
      display: inline-block;

      &:nth-of-type(2)::before {
        content: ">";
        margin: 0 5px;
      }

      &:last-of-type::before {
        content: ">";
        margin: 0 5px;
      }
    }
  }
`;

export const TabMenu_Wrapper = styled.nav`
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

      &.active {
        border-color: #222;
        background-color: #222;
        color: white;
      }
    }
  }
`;

export const Product_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: 55px;

  select {
    color: #333;
    display: flex;
    justify-content: right;
    width: 95px;
    height: 35px;
    margin-bottom: 30px;
    border: 1px solid #ddd;
    appearance: none;
    padding-left: 17px;

    /* 커스텀 화살표 */
    background-image: url("https://ybzfvjcmeedwjrpbdmgd.supabase.co/storage/v1/object/sign/Dobok/Keyboard%20arrow%20down.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NTA4MjBkYi00ZDg1LTRiNzgtYWNmYS1hY2MyZjM4Yzg4YjIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJEb2Jvay9LZXlib2FyZCBhcnJvdyBkb3duLnBuZyIsImlhdCI6MTc2ODI0NzIwMCwiZXhwIjoxNzk5NzgzMjAwfQ.RBY3uADd5xr0i7pmnpReGFXhUGxvIYayf0Cetz5oHoU");
    background-repeat: no-repeat;
    background-position: right 6px center;
    background-size: 24px;
  }

  margin-bottom: 190px;
`;
