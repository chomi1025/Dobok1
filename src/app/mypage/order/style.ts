import styled from "@emotion/styled";

export const Pagination = styled.div`
  display: flex;
  justify-content: center; // 중앙정렬
  width: 100%; // 부모 전체 차지
  margin-top: 70px;
  padding: 0;

  .pagination {
    display: flex; // ul flex로
    flex-wrap: wrap; // 버튼 많으면 다음 줄로 넘어감
    gap: 8px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .page-item {
    display: flex;
  }

  .page-link {
    padding: 6px 12px; // 글로벌 초기화 덮어쓰기
    height: 36px; // 높이 고정
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .active .page-link {
    font-weight: bold;
    border-color: black;
  }
`;

// style.ts
export const StatusActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const BaseButton = styled.button`
  width: 80px;
  padding: 8px 0;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
`;

export const PrimaryButton = styled(BaseButton)`
  background: #1e3a8a;
  color: #fff;
`;

export const SecondaryButton = styled(BaseButton)`
  border: 1px solid #ddd;
  color: #555;
`;
