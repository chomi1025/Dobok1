-- CreateTable
CREATE TABLE "UserNicknameHistory" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "nickname" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserNicknameHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWithdrawReason" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "reason" TEXT,
    "detail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserWithdrawReason_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserNicknameHistory" ADD CONSTRAINT "UserNicknameHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
