export const addToCart = async (item: any, user: any) => {
  try {
    if (user) {
      //  회원
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.productId,
          productOptionId: item.productOptionId,
          quantity: 1,
        }),
      });
      return res.ok;
    } else {
      // 비회원
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

      const existingIndex = localCart.findIndex(
        (val: any) => val.productOptionId === item.productOptionId,
      );

      if (existingIndex > -1) {
        localCart[existingIndex].quantity += 1;
      } else {
        localCart.push({
          ...item,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(localCart));
      window.dispatchEvent(new Event("cartUpdated"));
      return true;
    }
  } catch (error) {
    console.error("장바구니 담기 에러:", error);
    return false;
  }
};
