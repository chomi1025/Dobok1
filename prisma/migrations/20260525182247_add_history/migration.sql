-- CreateTable
CREATE TABLE "EstimatePostHistory" (
    "id" TEXT NOT NULL,
    "estimateId" TEXT NOT NULL,
    "before" JSONB,
    "after" JSONB,
    "changedFields" TEXT[],
    "userId" INTEGER,
    "isGuest" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EstimatePostHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EstimatePostHistory_estimateId_idx" ON "EstimatePostHistory"("estimateId");

-- CreateIndex
CREATE INDEX "EstimatePostHistory_createdAt_idx" ON "EstimatePostHistory"("createdAt");

-- AddForeignKey
ALTER TABLE "EstimatePostHistory" ADD CONSTRAINT "EstimatePostHistory_estimateId_fkey" FOREIGN KEY ("estimateId") REFERENCES "EstimatePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
