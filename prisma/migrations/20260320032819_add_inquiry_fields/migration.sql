-- CreateEnum
CREATE TYPE "InquiryCategory" AS ENUM ('PRODUCT', 'DELIVERY', 'ORDER', 'RETURN', 'OTHER');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('WAITING', 'COMPLETED');

-- AlterTable
ALTER TABLE "Inquiry" ADD COLUMN     "category" "InquiryCategory" NOT NULL DEFAULT 'OTHER',
ADD COLUMN     "status" "InquiryStatus" NOT NULL DEFAULT 'WAITING';
