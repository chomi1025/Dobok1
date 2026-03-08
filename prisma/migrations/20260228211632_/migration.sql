/*
  Warnings:

  - You are about to drop the column `name` on the `ProductOption` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductOption" DROP COLUMN "name",
ADD COLUMN     "sale" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT '판매중';
