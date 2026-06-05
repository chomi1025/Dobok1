-- DropForeignKey
ALTER TABLE "Claim" DROP CONSTRAINT "Claim_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- AlterTable
ALTER TABLE "Claim" ALTER COLUMN "orderId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "orderId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderNumber") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderNumber") ON DELETE SET NULL ON UPDATE CASCADE;
