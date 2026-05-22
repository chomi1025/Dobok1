-- CreateTable
CREATE TABLE "ResourcePost" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "ResourcePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceAttachment" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "ResourceAttachment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResourceAttachment" ADD CONSTRAINT "ResourceAttachment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "ResourcePost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
