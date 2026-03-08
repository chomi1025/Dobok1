"use client";
import MemberCheckoutPage from "./MemberCheckout";
import GuestCheckoutPage from "./GuestCheckout";

interface MemberUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  postcode: string;
  address: string;
  detailAddress: string;
}

interface CheckoutClientPageProps {
  user: MemberUser | null;
  isMember: boolean;
}

export default function CheckoutClientPage({
  user,
  isMember,
}: CheckoutClientPageProps) {
  if (isMember && user) return <MemberCheckoutPage user={user} />;

  return <GuestCheckoutPage />;
}
