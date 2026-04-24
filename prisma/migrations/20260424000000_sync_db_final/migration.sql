
ALTER TABLE "Order" ADD COLUMN "carrier" TEXT;
ALTER TABLE "Order" ADD COLUMN "trackingNumber" TEXT;

CREATE TABLE "OrderHistory" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "adminName" TEXT NOT NULL DEFAULT '관리자',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderHistory_pkey" PRIMARY KEY ("id")
);


ALTER TABLE "OrderHistory" ADD CONSTRAINT "OrderHistory_orderId_fkey"
FOREIGN KEY ("orderId") REFERENCES "Order"("orderNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE INDEX "Post_jobType_idx" ON "Post"("jobType");