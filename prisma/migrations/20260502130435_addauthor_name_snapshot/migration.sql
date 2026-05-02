/*
  Warnings:

  - You are about to drop the column `authorNickname` on the `Inquiry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Inquiry" DROP COLUMN "authorNickname",
ADD COLUMN     "authorNameSnapshot" TEXT;
