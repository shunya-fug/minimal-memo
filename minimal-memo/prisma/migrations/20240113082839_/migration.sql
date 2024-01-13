/*
  Warnings:

  - A unique constraint covering the columns `[sub,value]` on the table `tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "tag_value_key";

-- CreateIndex
CREATE UNIQUE INDEX "tag_sub_value_key" ON "tag"("sub", "value");
