-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customFileUrl" TEXT,
ADD COLUMN     "customRequest" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "isCustom" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isCustomizable" BOOLEAN NOT NULL DEFAULT false;
