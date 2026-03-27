/*
  Warnings:

  - Added the required column `address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerEmail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerPhone` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detailAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postcode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverPhone` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "buyerEmail" TEXT NOT NULL,
ADD COLUMN     "buyerName" TEXT NOT NULL,
ADD COLUMN     "buyerPhone" TEXT NOT NULL,
ADD COLUMN     "detailAddress" TEXT NOT NULL,
ADD COLUMN     "postcode" TEXT NOT NULL,
ADD COLUMN     "receiverName" TEXT NOT NULL,
ADD COLUMN     "receiverPhone" TEXT NOT NULL;
