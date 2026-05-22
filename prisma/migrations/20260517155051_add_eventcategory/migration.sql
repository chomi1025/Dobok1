-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('COMPETITION', 'SEMINAR', 'EVENT', 'NOTICE');

-- DropIndex
DROP INDEX "Post_jobRole_idx";

-- DropIndex
DROP INDEX "Post_jobType_idx";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "eventCategory" "EventCategory";

-- CreateIndex
CREATE INDEX "Post_eventCategory_idx" ON "Post"("eventCategory");

-- CreateIndex
CREATE INDEX "Post_eventDate_idx" ON "Post"("eventDate");
