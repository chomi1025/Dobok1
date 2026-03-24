/*
  Warnings:

  - A unique constraint covering the columns `[userId,productOptionId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CartItem_userId_productOptionId_key" ON "CartItem"("userId", "productOptionId");
