-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_orderItemId_fkey";

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
