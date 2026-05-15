"use client";
import MemberCheckoutPage from "./MemberCheckout";
import GuestCheckoutPage from "./GuestCheckout";

interface FormattedCartItem {
  id: number;
  quantity: number;
  productId: number;

  name: string;
  optionId: number;

  thumbnail: string | null;
  description: string | null;

  isCustomizable: boolean;

  originalPrice?: number;
  price: number;

  optionName?: string | null;
  optionValue?: string | null;
  optionName2?: string | null;
  optionValue2?: string | null;
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
