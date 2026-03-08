-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "productOptionId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productOptionId_fkey" FOREIGN KEY ("productOptionId") REFERENCES "ProductOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
