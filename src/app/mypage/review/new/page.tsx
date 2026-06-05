import { prisma } from "@/lib/prisma";
import ReviewNewClientPage from "./page.client";

export default async function ReviewNewPage({
  searchParams,
}: {
  searchParams: {
    orderItemId?: string;
  };
}) {
  const orderItemId = Number(searchParams.orderItemId);

  const item = await prisma.orderItem.findUnique({
    where: {
      id: orderItemId,
    },
  });

  if (!item) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  if (item.reviews) {
    return <div>이미 리뷰를 작성한 상품입니다.</div>;
  }

  return <ReviewNewClientPage item={item} />;
}
