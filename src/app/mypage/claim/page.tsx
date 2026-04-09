import Link from "next/link";
import { Column } from "@/components/Table/page";
import styles from "./page.module.scss";
import Image from "next/image";
import ClaimsClientPage from "./page.client";

type ClaimType = "cancel" | "exchange" | "return";
export interface Claim {
  id: number;
  type: ClaimType;
  requestedAt: string;
  claimNumber: string;
  name: string;
  img: string;
  price: string;
  quantity: number;
  total: string;
}

export default function ClaimsPage() {
  const mockClaims: Claim[] = [
    {
      id: 1,
      type: "cancel",
      requestedAt: "2026-04-05",
      claimNumber: "C-20260405-123",
      name: "프리미엄 선수용 도복 - 화이트",
      img: "https://via.placeholder.com/90",
      price: "125000",
      quantity: 1,
      total: "125000",
    },
    {
      id: 2,
      type: "exchange",
      requestedAt: "2026-04-03",
      claimNumber: "E-20260403-045",
      name: "컴팩트 훈련용 도복 - 블루",
      img: "https://via.placeholder.com/90",
      price: "89000",
      quantity: 1,
      total: "89000",
    },
    {
      id: 3,
      type: "return",
      requestedAt: "2026-03-28",
      claimNumber: "R-20260328-999",
      name: "경량 스파링 보호구 세트",
      img: "https://via.placeholder.com/90",
      price: "45000",
      quantity: 2,
      total: "90000",
    },
    {
      id: 4,
      type: "cancel",
      requestedAt: "2026-03-20",
      claimNumber: "C-20260320-012",
      name: "도복 전용 가방 - 라지",
      img: "https://via.placeholder.com/90",
      price: "35000",
      quantity: 1,
      total: "35000",
    },
    {
      id: 5,
      type: "exchange",
      requestedAt: "2026-03-15",
      claimNumber: "E-20260315-777",
      name: "입문자용 도복 - 네이비",
      img: "https://via.placeholder.com/90",
      price: "65000",
      quantity: 1,
      total: "65000",
    },
  ];

  return <ClaimsClientPage claims={mockClaims} />;
}
