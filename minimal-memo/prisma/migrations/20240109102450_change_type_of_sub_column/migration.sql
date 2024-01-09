/*
  Warnings:

  - Made the column `sub` on table `tag` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sub` on table `tweet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tag" ALTER COLUMN "sub" SET NOT NULL;

-- AlterTable
ALTER TABLE "tweet" ALTER COLUMN "sub" SET NOT NULL;
