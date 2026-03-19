"use client";
import styles from "./page.module.scss";
import { useState } from "react";

export default function FaqClientPage({ faqs }: { faqs: any[] }) {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={styles.inner}>
      <div>
        <h1>FAQ</h1>
      </div>

      <article className={`${styles.contentSection}`}>
        <h2>FAQ 리스트</h2>

        <ul>
          {faqs?.map((faq) => (
            <li key={faq.id}>
              <button
                onClick={() => toggle(faq.id)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Q. {faq.question}
              </button>

              {/* 상세내용 */}
              <div
                className={`${styles.answer} ${openId === faq.id ? styles.isOpen : ""}`}
                aria-hidden={openId !== faq.id}
              >
                A. {faq.answer}
              </div>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
