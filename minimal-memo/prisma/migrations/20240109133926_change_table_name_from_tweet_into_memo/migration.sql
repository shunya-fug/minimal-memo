/*
  Warnings:

  - You are about to drop the `_TagToTweet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tweet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TagToTweet" DROP CONSTRAINT "_TagToTweet_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagToTweet" DROP CONSTRAINT "_TagToTweet_B_fkey";

-- DropTable
DROP TABLE "_TagToTweet";

-- DropTable
DROP TABLE "tweet";

-- CreateTable
CREATE TABLE "memo" (
    "id" TEXT NOT NULL,
    "sub" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "memo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MemoToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MemoToTag_AB_unique" ON "_MemoToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_MemoToTag_B_index" ON "_MemoToTag"("B");

-- AddForeignKey
ALTER TABLE "_MemoToTag" ADD CONSTRAINT "_MemoToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "memo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemoToTag" ADD CONSTRAINT "_MemoToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
