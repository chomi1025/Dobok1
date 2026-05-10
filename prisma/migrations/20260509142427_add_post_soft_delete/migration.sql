-- CreateEnum
CREATE TYPE "DeleteReason" AS ENUM ('USER', 'ADMIN', 'REPORTED', 'SPAM');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "deleteReason" "DeleteReason",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedBy" INTEGER;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
