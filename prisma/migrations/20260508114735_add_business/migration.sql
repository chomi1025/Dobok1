-- CreateEnum
CREATE TYPE "AuthStatus" AS ENUM ('NONE', 'PENDING', 'APPROVED', 'REJECTED');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'BUSINESS';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isRecommended" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "businessStatus" "AuthStatus" NOT NULL DEFAULT 'NONE';

-- CreateTable
CREATE TABLE "BusinessInfo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "businessNumber" TEXT NOT NULL,
    "representative" TEXT NOT NULL,
    "taxEmail" TEXT NOT NULL,
    "paperUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessInfo_userId_key" ON "BusinessInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessInfo_businessNumber_key" ON "BusinessInfo"("businessNumber");

-- AddForeignKey
ALTER TABLE "BusinessInfo" ADD CONSTRAINT "BusinessInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
