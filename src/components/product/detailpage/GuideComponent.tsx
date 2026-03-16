"use client";
import styled from "@emotion/styled";
import { useState } from "react";

export const GuideSection = styled.div<{
  openMenu: boolean;
  expandedHeight: string;
}>`
  min-height: ${(props) => (props.openMenu ? props.expandedHeight : "60px")};

  &:not(:last-of-type) {
    margin-bottom: 80px;
  }

  > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

    h3 {
    }
  }

  > ul {
    display: ${(props) => (props.openMenu ? "block" : "none")};

    > li {
      display: flex;
      border-bottom: 1px solid #ddd;
      padding: 25px 0;

      > p {
        width: 25%;
      }

      > div {
        padding-left: 23px;
        width: 75%;
      }
    }
  }
`;

export default function GuideSectionComponent({ data }: any) {
  const [openMenu, setOpenMenu] = useState(true);

  return (
    <GuideSection openMenu={openMenu} expandedHeight={data.expandedHeight}>
      {/* 큰제목 */}
      <div>
        <h3>{data.title}</h3>
        <button type="button" onClick={() => setOpenMenu((prev) => !prev)}>
          화살표
        </button>
      </div>

      <hr />

      <ul>
        {data.items.map((el: any, index: number) => (
          <li key={index}>
            <p>{el.label}</p>

            <div>
              {el.content?.map((cont: []) => (
                <p>{cont}</p>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </GuideSection>
  );
}
