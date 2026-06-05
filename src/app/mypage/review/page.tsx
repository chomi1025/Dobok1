import ReviewClientPage from "./page.client";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { redirect } from "next/navigation";
import { Prisma, Review } from "@prisma/client";

type OrderItemWithReview = Prisma.OrderItemGetPayload<{
  include: {
    reviews: true;
    product: true;
    order: true;
  };
}>;

type ReviewListItem = {
  id: number;
  productId: number;
  productName: string;
  img: string | null;
  optionTexts: (string | null)[];
  deliveredAt: string;
  reviewStatus: "리뷰작성가능" | "리뷰작성완료";
  reviewId?: number;
};

type GroupedReviewItem = {
  productId: number;
  productName: string;
  img: string | null;
  optionTexts: (string | null)[];
  reviews: Review[];
  latestDeliveredAt: Date;
};

export default async function ReviewPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = Number(session.user.id);

  const orderItems: OrderItemWithReview[] = await prisma.orderItem.findMany({
    where: {
      order: {
        userId,
        status: "DELIVERED",
      },
    },
    include: {
      reviews: true,
      product: true,
      order: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const grouped = Object.values(
    orderItems.reduce(
      (acc: Record<number, GroupedReviewItem>, item: OrderItemWithReview) => {
        const key = item.productId;

        const reviews = item.reviews ? [item.reviews] : [];

        if (!acc[key]) {
          acc[key] = {
            productId: item.productId,
            productName: item.productName,
            img: item.product.thumbnail,
            optionTexts: [item.optionText],
            reviews,
            latestDeliveredAt: item.order.createdAt,
          };
        } else {
          acc[key].optionTexts.push(item.optionText);
          acc[key].reviews.push(...reviews);
        }

        return acc;
      },
      {} as Record<number, GroupedReviewItem>,
    ),
  );

  const reviews: ReviewListItem[] = grouped.map((item) => {
    const hasReview = item.reviews.length > 0;

    return {
      id: item.productId,
      productId: item.productId,
      productName: item.productName,
      optionTexts: item.optionTexts,
      img: item.img,
      deliveredAt: item.latestDeliveredAt.toISOString().split("T")[0],
      reviewStatus: hasReview ? "리뷰작성완료" : "리뷰작성가능",
      reviewId: item.reviews[0]?.id,
    };
  });

  return <ReviewClientPage initialReviews={reviews} />;
}
