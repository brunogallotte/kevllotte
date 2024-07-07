-- DropForeignKey
ALTER TABLE "posts_like" DROP CONSTRAINT "posts_like_post_id_fkey";

-- CreateTable
CREATE TABLE "comments_like" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts_like" ADD CONSTRAINT "posts_like_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_like" ADD CONSTRAINT "comments_like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_like" ADD CONSTRAINT "comments_like_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "posts_comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
