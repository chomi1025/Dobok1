-- DropForeignKey
ALTER TABLE "ReviewReply" DROP CONSTRAINT "ReviewReply_reviewId_fkey";

-- AddForeignKey
ALTER TABLE "ReviewReply" ADD CONSTRAINT "ReviewReply_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
