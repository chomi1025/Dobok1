/*
  Warnings:

  - You are about to drop the column `orderId` on the `Claim` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Claim` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Claim" DROP CONSTRAINT "Claim_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Claim" DROP CONSTRAINT "Claim_userId_fkey";

-- AlterTable
ALTER TABLE "Claim" DROP COLUMN "orderId",
DROP COLUMN "userId";
