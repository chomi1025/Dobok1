-- CreateIndex
CREATE INDEX "Notice_isFixed_createdAt_idx" ON "Notice"("isFixed", "createdAt" DESC);