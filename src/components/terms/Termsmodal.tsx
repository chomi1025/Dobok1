"use client";

import PrivacyTerms from "./PrivacyTerms";
import ServiceTerms from "./ServiceTerms";
import * as S from "./style";

type Props = {
  open: boolean;
  type: "service" | "privacy";
  onClose: () => void;
};

export default function TermsModal({ open, onClose, type }: Props) {
  if (!open) return null;

  return (
    <S.Backdrop onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Header>
          {type === "service" ? "이용약관" : "개인정보 수집 및 이용"}
          <button onClick={onClose}>✕</button>
        </S.Header>

        <S.Content>
          {type === "service" ? <ServiceTerms /> : <PrivacyTerms />}
        </S.Content>

        <S.Footer>
          <button onClick={onClose}>확인</button>
        </S.Footer>
      </S.Modal>
    </S.Backdrop>
  );
}
