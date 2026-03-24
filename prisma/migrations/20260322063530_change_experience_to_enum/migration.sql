/*
  Warnings:

  - The `experience` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('NEWBIE', 'JUNIOR', 'MID_LEVEL', 'SENIOR', 'IRRELEVANT');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "experience",
ADD COLUMN     "experience" "ExperienceLevel" DEFAULT 'IRRELEVANT';
