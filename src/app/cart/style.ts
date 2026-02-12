import styled from "@emotion/styled";

export const Inner = styled.section`
  width: 1040px;
  margin: 0 auto;

  padding: 90px 0 0;
`;

export const SectionHeader = styled.div`
  text-align: center;

  h2 {
    font-size: 32px;
  }
`;

// CartEmpty

export const List_Wrapper = styled.div`
  margin-top: 40px;
`;

export const List = styled.div`
  padding: 100px 0;
  margin: 10px 0 250px;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  text-align: center;

  > span {
    display: flex;
    margin: 0 auto;
    background: url("https://ybzfvjcmeedwjrpbdmgd.supabase.co/storage/v1/object/sign/Dobok/lsicon_shopping-cart-filled.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NTA4MjBkYi00ZDg1LTRiNzgtYWNmYS1hY2MyZjM4Yzg4YjIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJEb2Jvay9sc2ljb25fc2hvcHBpbmctY2FydC1maWxsZWQucG5nIiwiaWF0IjoxNzY4MzI4NzkzLCJleHAiOjE3OTk4NjQ3OTN9.j2QJnpqscdnzOrDiV37vULMF8L9d9ZG1Eb4Bx2AmSNg");
    width: 50px;
    height: 50px;
    background-size: 50px 50px;
    background-repeat: no-repeat;
    background-position: center;
  }

  > p {
    margin: 15px 0;
    font-size: 15px;
    color: #888;
  }

  > button {
    font-size: 15px;
    width: 150px;
    height: 45px;
    background-color: #333;
    border-radius: 5px;
    color: white;
  }
`;
