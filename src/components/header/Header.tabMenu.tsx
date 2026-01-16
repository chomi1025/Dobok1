"use client";
import { useState } from "react";
import * as S from "./style";

export default function TabMenu({ categories }) {
  const [active, setActive] = useState(0);

  return (
    <S.TabWrapper>
      {categories.map((cat, idx) => (
        <S.TabButton
          key={cat.id}
          active={idx === active}
          onClick={() => setActive(idx)}
        >
          {cat.name}
        </S.TabButton>
      ))}
    </S.TabWrapper>
  );
}
