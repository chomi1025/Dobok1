import * as C from "./style";

export default function CartEmptyComponent() {
  return (
    <C.List_Wrapper>
      <p>총 0개</p>

      <C.List>
        <span></span>
        <p>장바구니가 비어 있습니다.</p>
        <button>쇼핑 하러가기</button>
      </C.List>
    </C.List_Wrapper>
  );
}
