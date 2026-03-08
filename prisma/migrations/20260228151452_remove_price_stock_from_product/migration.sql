/*
  Warnings:

  - Added the required column `name` to the `ProductOption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductOption" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "color" DROP NOT NULL,
ALTER COLUMN "size" DROP NOT NULL;
