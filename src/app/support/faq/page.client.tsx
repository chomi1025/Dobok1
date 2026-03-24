"use client";

import Button from "@/components/common/buttons/page";
import styles from "./page.module.scss";
import { useState } from "react";
import CategoryTabs from "@/components/CategoryTabs/page";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { customConfirm } from "@/lib/swal";

interface FaqsType {
  id: number;
  categoryId: number;
  category: string;
  question: string;
  answer: string;
}

interface Props {
  faqs: FaqsType[];
  isAdmin: boolean;
}

const CATEGORIES = [
  { name: "상품", id: "product" },
  { name: "배송", id: "delivery" },
  { name: "주문/결제", id: "order" },
  { name: "반품/환불", id: "return" },
];

export default function FaqClientPage({ faqs, isAdmin }: Props) {
  const [openId, setOpenId] = useState<number | null>(null);
  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };
  const [activeTab, setActiveTab] = useState<number | string>("all");

  const router = useRouter();

  const filteredFaqs =
    activeTab === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === activeTab);

  const handleDeleteFaq = async (id: number) => {
    const result = await customConfirm({
      title: "이 FAQ를 삭제하시겠습니까?",
      confirmText: "삭제",
      isDanger: true,
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/faq/${id}`, { method: "DELETE" });
        if (response.ok) {
          toast.success("삭제되었습니다.");
          router.refresh();
        } else {
          toast.error("삭제 실패");
        }
      } catch (err) {
        toast.error("네트워크 오류");
      }
    }
  };
  return (
    <>
      <section className={styles.titleWrapper}>
        <h1>FAQ</h1>
      </section>

      <CategoryTabs
        categories={CATEGORIES}
        activeTab={activeTab}
        onTabChange={(id) => {
          setActiveTab(id);
          setOpenId(null);
        }}
        className={styles.faqTabs}
      />

      <article className={styles.contentsWrapper}>
        {isAdmin && (
          <Button variant="primary" href="/support/faq/new">
            {"작성하기"}
          </Button>
        )}

        {!filteredFaqs || filteredFaqs.length === 0 ? (
          <div className={styles.emptyState}>
            <p>해당 카테고리에 등록된 질문이 없습니다.</p>
          </div>
        ) : (
          <ul className={styles.faqList}>
            {filteredFaqs.map((faq) => (
              <li
                key={faq.id}
                className={`${styles.faqItem} ${openId === faq.id ? styles.active : ""}`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className={`${styles.questionBtn} ${openId === faq.id ? styles.active : ""}`}
                >
                  <span className={styles.qText}>Q. {faq.question}</span>

                  {isAdmin && (
                    <div
                      className={styles.adminBtns}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="edit"
                        href={`/support/faq/edit/${faq.id}`}
                      >
                        수정
                      </Button>

                      <Button
                        variant="delete"
                        onClick={() => handleDeleteFaq(faq.id)}
                      >
                        삭제
                      </Button>
                    </div>
                  )}

                  <span className={styles.arrow}>
                    {openId === faq.id ? "▲" : "▼"}
                  </span>
                </button>

                <div
                  className={`${styles.answer} ${openId === faq.id ? styles.isOpen : ""}`}
                >
                  <div className={styles.answerInner}>
                    <div className={styles.answerContent}>
                      <span className={styles.aText}>A.</span> {faq.answer}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </article>
    </>
  );
}
