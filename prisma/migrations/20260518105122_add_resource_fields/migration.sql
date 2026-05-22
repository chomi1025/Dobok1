/*
  Warnings:

  - Added the required column `authorId` to the `ResourcePost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResourcePost" ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'DOCUMENT',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "externalUrl" TEXT,
ADD COLUMN     "videoUrl" TEXT;

-- AddForeignKey
ALTER TABLE "ResourcePost" ADD CONSTRAINT "ResourcePost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
