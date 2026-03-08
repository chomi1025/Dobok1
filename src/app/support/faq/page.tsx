"use client";
import * as F from "./style";
import { useState } from "react";

interface Faq {
  id: number;
  question: string;
  answer: string;
}

const faqs = [
  {
    id: 1,
    question: "주문 후 배송은 얼마나 걸리나요?",
    answer:
      "평균 배송 기간은 2~3일 소요됩니다. 지역 및 택배사 사정에 따라 지연될 수 있습니다.",
  },
  {
    id: 2,
    question: "배송지를 변경하고 싶어요.",
    answer:
      "상품이 출고되기 전까지는 마이페이지 > 주문내역에서 배송지 변경이 가능합니다. 출고 후에는 변경이 어렵습니다.",
  },
  {
    id: 3,
    question: "교환 및 반품은 어떻게 하나요?",
    answer:
      "상품 수령 후 7일 이내 마이페이지에서 교환/반품 신청이 가능합니다. 단, 사용 흔적이 있는 경우 처리되지 않을 수 있습니다.",
  },
  {
    id: 4,
    question: "비회원도 주문할 수 있나요?",
    answer:
      "네, 비회원 주문이 가능합니다. 단, 주문 조회 시 주문번호가 필요하니 꼭 보관해 주세요.",
  },
  {
    id: 5,
    question: "결제 수단에는 어떤 것들이 있나요?",
    answer:
      "신용카드, 계좌이체, 간편결제(카카오페이, 네이버페이 등)를 지원하고 있습니다.",
  },
  {
    id: 6,
    question: "상품이 불량일 경우 어떻게 해야 하나요?",
    answer:
      "상품 수령 후 7일 이내 고객센터로 문의 주시면 교환 또는 환불을 도와드립니다.",
  },
];

export default function FaqPage() {
  // 아무것도 안열려있는 상태
  const [openId, setOpenId] = useState<number | null>(null);

  // 열었다 닫았다
  const toggle = (id: number) => {
    // setOpenId((open) => (open === id ? null : id));
    setOpenId(openId === id ? null : id);
  };

  return (
    <F.Inner>
      <h3>FAQ</h3>

      <ul>
        {faqs.map((faq) => (
          <li>
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
            {openId === faq.id && <div>A. {faq.answer}</div>}
          </li>
        ))}
      </ul>
    </F.Inner>
  );
}
