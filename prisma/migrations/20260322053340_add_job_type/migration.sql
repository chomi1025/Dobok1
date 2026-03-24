-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('HIRING', 'SEEKING');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "applyMethod" TEXT,
ADD COLUMN     "etcInfo" TEXT,
ADD COLUMN     "jobType" "JobType",
ADD COLUMN     "mainTask" TEXT,
ADD COLUMN     "qualification" TEXT,
ADD COLUMN     "workCondition" TEXT;
