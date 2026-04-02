"use client";
import MemberCheckoutPage from "./MemberCheckout";
import GuestCheckoutPage from "./GuestCheckout";

interface FormattedCartItem {
  id: number;
  quantity: number;
  productId: number;
  name: string;
  thumbnail: string | null;
  description: string | null;
  isCustomizable: boolean;
  price: number;
  size: string;
  color: string;
  sale: number | null;
}

interface MemberUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    address: string;
    postCode: string;
    detailAddress: string;
  };
}

interface Props {
  memberUser?: MemberUser | null;
  memberCart?: FormattedCartItem[];
  isMember: boolean;
  user?: any;
}

export default function CheckoutClientPage({
  isMember,
  memberUser,
  memberCart,
}: Props) {
  // 회원일때
  if (isMember && memberUser) {
    return (
      <MemberCheckoutPage
        user={memberUser}
        memberUser={memberUser}
        memberCart={memberCart || []}
      />
    );
  }

  // 비회원일떄
  return <GuestCheckoutPage />;
}
