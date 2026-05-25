-- CreateEnum
CREATE TYPE "EstimateStatus" AS ENUM ('WAITING', 'PROCESSING', 'DONE');

-- CreateTable
CREATE TABLE "EstimatePost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "writer" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "userId" INTEGER,
    "password" TEXT,
    "status" "EstimateStatus" NOT NULL DEFAULT 'WAITING',
    "isSecret" BOOLEAN NOT NULL DEFAULT true,
    "adminReply" TEXT,
    "repliedAt" TIMESTAMP(3),
    "productId" INTEGER,
    "quantity" INTEGER,
    "size" TEXT,
    "printing" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EstimatePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimateAttachment" (
    "id" TEXT NOT NULL,
    "estimatePostId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EstimateAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EstimatePost_createdAt_idx" ON "EstimatePost"("createdAt");

-- CreateIndex
CREATE INDEX "EstimatePost_status_idx" ON "EstimatePost"("status");

-- AddForeignKey
ALTER TABLE "EstimatePost" ADD CONSTRAINT "EstimatePost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimatePost" ADD CONSTRAINT "EstimatePost_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimateAttachment" ADD CONSTRAINT "EstimateAttachment_estimatePostId_fkey" FOREIGN KEY ("estimatePostId") REFERENCES "EstimatePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
