import ReviewDetailClientPage from "./page.client";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: { reviewId: string };
}

export default async function ReviewDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const review = await prisma.review.findUnique({
    where: {
      id: Number(params.reviewId),
    },
    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
      reply: true,
    },
  });

  if (!review) {
    notFound();
  }

  if (review.userId !== Number(session.user.id)) {
    return <div>권한 없음</div>;
  }

  const formatted = {
    id: review.id,
    rating: review.rating,
    content: review.content,
    images: review.images,
    createdAt: review.createdAt.toISOString(),

    orderItem: {
      product: {
        id: review.orderItem.product.id,
        name: review.orderItem.product.name,
        thumbnail: review.orderItem.product.thumbnail,
        images: review.orderItem.product.images,
      },
      option: review.orderItem.optionText,
    },

    reply: review.reply
      ? {
          id: review.reply.id,
          content: review.reply.content,
          createdAt: review.reply.createdAt.toISOString(),
        }
      : undefined,
  };

  return (
    <>
      <ReviewDetailClientPage initialReviews={formatted} />
    </>
  );
}
