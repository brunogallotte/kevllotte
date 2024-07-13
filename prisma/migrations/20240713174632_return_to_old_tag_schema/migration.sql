/*
  Warnings:

  - You are about to drop the `PostTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostTag" DROP CONSTRAINT "PostTag_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostTag" DROP CONSTRAINT "PostTag_tagId_fkey";

-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "postId" TEXT;

-- DropTable
DROP TABLE "PostTag";

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
