/*
  Warnings:

  - You are about to drop the `liked_posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "liked_posts" DROP CONSTRAINT "liked_posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "liked_posts" DROP CONSTRAINT "liked_posts_user_id_fkey";

-- DropTable
DROP TABLE "liked_posts";

-- CreateTable
CREATE TABLE "posts_like" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts_like" ADD CONSTRAINT "posts_like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_like" ADD CONSTRAINT "posts_like_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
