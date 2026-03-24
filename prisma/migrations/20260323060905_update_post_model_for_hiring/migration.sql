/*
  Warnings:

  - You are about to drop the column `etcInfo` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `mainTask` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `qualification` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `workCondition` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "etcInfo",
DROP COLUMN "mainTask",
DROP COLUMN "qualification",
DROP COLUMN "workCondition";
