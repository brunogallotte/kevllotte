/*
  Warnings:

  - A unique constraint covering the columns `[post_id]` on the table `saved_posts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "saved_posts_post_id_key" ON "saved_posts"("post_id");
