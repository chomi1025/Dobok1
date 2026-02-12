/*
  Warnings:

  - You are about to drop the `ProductInquiry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductInquiryReply` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionReply` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductInquiry" DROP CONSTRAINT "ProductInquiry_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductInquiry" DROP CONSTRAINT "ProductInquiry_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProductInquiryReply" DROP CONSTRAINT "ProductInquiryReply_adminId_fkey";

-- DropForeignKey
ALTER TABLE "ProductInquiryReply" DROP CONSTRAINT "ProductInquiryReply_productInquiryId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_userId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionReply" DROP CONSTRAINT "QuestionReply_adminId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionReply" DROP CONSTRAINT "QuestionReply_questionId_fkey";

-- DropTable
DROP TABLE "ProductInquiry";

-- DropTable
DROP TABLE "ProductInquiryReply";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "QuestionReply";

-- CreateTable
CREATE TABLE "ProductQna" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "isSecret" BOOLEAN NOT NULL DEFAULT false,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductQna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductQnaReply" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "productQnaId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductQnaReply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductQnaReply_productQnaId_key" ON "ProductQnaReply"("productQnaId");

-- AddForeignKey
ALTER TABLE "ProductQna" ADD CONSTRAINT "ProductQna_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductQna" ADD CONSTRAINT "ProductQna_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductQnaReply" ADD CONSTRAINT "ProductQnaReply_productQnaId_fkey" FOREIGN KEY ("productQnaId") REFERENCES "ProductQna"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductQnaReply" ADD CONSTRAINT "ProductQnaReply_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
