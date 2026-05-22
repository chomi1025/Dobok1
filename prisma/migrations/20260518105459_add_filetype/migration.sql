/*
  Warnings:

  - Added the required column `fileSize` to the `ResourceAttachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileType` to the `ResourceAttachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResourceAttachment" ADD COLUMN     "fileSize" INTEGER NOT NULL,
ADD COLUMN     "fileType" TEXT NOT NULL;
