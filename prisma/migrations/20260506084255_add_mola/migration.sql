/*
  Warnings:

  - You are about to drop the column `discountRate` on the `ProductOption` table. All the data in the column will be lost.
  - You are about to drop the column `sale` on the `ProductOption` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductOption" DROP COLUMN "discountRate",
DROP COLUMN "sale",
ADD COLUMN     "discountValue" INTEGER;
