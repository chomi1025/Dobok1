"use client";
import styles from "./GuideSection.module.scss";
import { useState } from "react";

export default function GuideSection({ data }: any) {
  const [openMenu, setOpenMenu] = useState(true);

  return (
    <section className={`${styles.shoppingGuide} ${openMenu && styles.active}`}>
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
    </section>
  );
}
