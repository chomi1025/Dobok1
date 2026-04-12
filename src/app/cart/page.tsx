import CartClientPage from "./page.client";

export const metadata = {
  title: "장바구니 | 도복일번지",
  description: "선택하신 도복과 용품들을 확인하고 주문을 진행하세요.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CartPage() {
  return <CartClientPage />;
}
