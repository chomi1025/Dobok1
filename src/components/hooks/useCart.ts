export const addToCart = async (itemOrItems: any, user: any) => {
  const items = Array.isArray(itemOrItems) ? itemOrItems : [itemOrItems];

  try {
    if (user) {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: Number(item.productId),
            productOptionId: Number(item.productOptionId),
            quantity: Number(item.quantity || 1),
          })),
        }),
      });
      return res.ok;
    } else {
      //  비회원
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

      items.forEach((item) => {
        const existingIndex = localCart.findIndex(
          (val: any) => val.productOptionId === item.productOptionId,
        );

        if (existingIndex > -1) {
          localCart[existingIndex].quantity += item.quantity || 1;
        } else {
          localCart.push({ ...item, quantity: item.quantity || 1 });
        }
      });

      localStorage.setItem("cart", JSON.stringify(localCart));
      window.dispatchEvent(new Event("cartUpdated"));
      return true;
    }
  } catch (error) {
    console.error("장바구니 담기 에러:", error);
    return false;
  }
};
