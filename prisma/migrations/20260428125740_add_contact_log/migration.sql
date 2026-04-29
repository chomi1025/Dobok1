-- CreateTable
CREATE TABLE "ContactViewLog" (
    "id" SERIAL NOT NULL,
    "viewerId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactViewLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContactViewLog" ADD CONSTRAINT "ContactViewLog_viewerId_fkey" FOREIGN KEY ("viewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
