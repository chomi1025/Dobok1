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
  return <ClaimsClientPage />;
}
