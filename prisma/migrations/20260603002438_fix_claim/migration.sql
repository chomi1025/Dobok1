-- DropForeignKey
ALTER TABLE "Claim" DROP CONSTRAINT "Claim_orderItemId_fkey";

-- AlterTable
ALTER TABLE "Claim" ADD COLUMN     "orderId" INTEGER,
ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "status" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
