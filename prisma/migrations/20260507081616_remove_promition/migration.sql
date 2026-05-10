/*
  Warnings:

  - You are about to drop the `Promotion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToPromotion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductToPromotion" DROP CONSTRAINT "_ProductToPromotion_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToPromotion" DROP CONSTRAINT "_ProductToPromotion_B_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "discountType" "PromotionType",
ADD COLUMN     "discountValue" INTEGER;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "discountType" "PromotionType",
ADD COLUMN     "discountValue" INTEGER;

-- DropTable
DROP TABLE "Promotion";

-- DropTable
DROP TABLE "_ProductToPromotion";
