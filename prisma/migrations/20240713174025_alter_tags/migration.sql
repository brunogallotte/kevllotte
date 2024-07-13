/*
  Warnings:

  - You are about to drop the column `postId` on the `tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_postId_fkey";

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "postId";

-- CreateTable
CREATE TABLE "PostTag" (
    "id" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
