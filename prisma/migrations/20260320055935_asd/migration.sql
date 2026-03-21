/*
  Warnings:

  - A unique constraint covering the columns `[inquiryId]` on the table `InquiryReply` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "InquiryReply" DROP CONSTRAINT "InquiryReply_inquiryId_fkey";

-- AlterTable
ALTER TABLE "Inquiry" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "InquiryReply_inquiryId_key" ON "InquiryReply"("inquiryId");

-- AddForeignKey
ALTER TABLE "InquiryReply" ADD CONSTRAINT "InquiryReply_inquiryId_fkey" FOREIGN KEY ("inquiryId") REFERENCES "Inquiry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
