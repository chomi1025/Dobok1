const fetchGuestCartData = async (localData: any[]) => {
  if (localData.length === 0) return [];
  const optionIds = localData.map((item) => item.productOptionId).join(",");
  const res = await fetch(`/api/products/options?ids=${optionIds}`);
  if (!res.ok) throw new Error("장바구니 정보를 불러오지 못했습니다.");
  const serverInfo = await res.json();

  return localData.map((localItem: any) => {
    const info = serverInfo.find(
      (s: any) => Number(s.id) === Number(localItem.productOptionId),
    );
    return info
      ? {
          ...localItem,
          ...info,
          productName: info.product?.name || localItem.productName,
          thumbnail: info.product?.thumbnail || localItem.thumbnail,
          id: info.id,
        }
      : localItem;
  });
};
