-- AlterTable
ALTER TABLE "posts_comment" ADD COLUMN     "replyToId" TEXT;

-- AddForeignKey
ALTER TABLE "posts_comment" ADD CONSTRAINT "posts_comment_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "posts_comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
