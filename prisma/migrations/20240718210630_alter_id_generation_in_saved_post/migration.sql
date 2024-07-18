/*
  Warnings:

  - The primary key for the `saved_posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `saved_posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "saved_posts" DROP CONSTRAINT "saved_posts_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "saved_posts_pkey" PRIMARY KEY ("id");
