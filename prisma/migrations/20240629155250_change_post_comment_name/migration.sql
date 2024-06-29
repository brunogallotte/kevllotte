/*
  Warnings:

  - You are about to drop the `comment_posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment_posts" DROP CONSTRAINT "comment_posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "comment_posts" DROP CONSTRAINT "comment_posts_user_id_fkey";

-- DropTable
DROP TABLE "comment_posts";

-- CreateTable
CREATE TABLE "posts_comment" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts_comment" ADD CONSTRAINT "posts_comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_comment" ADD CONSTRAINT "posts_comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
