/*
  Warnings:

  - You are about to drop the column `color` on the `ProductOption` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `ProductOption` table. All the data in the column will be lost.
  - The `status` column on the `ProductOption` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ONSALE', 'SOLDOUT', 'HIDDEN');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "isVisible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ProductOption" DROP COLUMN "color",
DROP COLUMN "size",
ADD COLUMN     "optionName" TEXT,
ADD COLUMN     "optionName2" TEXT,
ADD COLUMN     "optionValue" TEXT,
ADD COLUMN     "optionValue2" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'ONSALE';
