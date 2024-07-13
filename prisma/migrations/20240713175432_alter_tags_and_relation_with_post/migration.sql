/*
  Warnings:

  - You are about to drop the column `postId` on the `tags` table. All the data in the column will be lost.
  - Added the required column `post_id` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_postId_fkey";

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "postId",
ADD COLUMN     "post_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
