-- CreateEnum
CREATE TYPE "TagType" AS ENUM ('NORMAL', 'FOLDER');

-- CreateTable
CREATE TABLE "tweet" (
    "id" TEXT NOT NULL,
    "sub" TEXT,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" TEXT NOT NULL,
    "sub" TEXT,
    "value" TEXT NOT NULL,
    "type" "TagType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagToTweet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tag_value_key" ON "tag"("value");

-- CreateIndex
CREATE UNIQUE INDEX "_TagToTweet_AB_unique" ON "_TagToTweet"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToTweet_B_index" ON "_TagToTweet"("B");

-- AddForeignKey
ALTER TABLE "_TagToTweet" ADD CONSTRAINT "_TagToTweet_A_fkey" FOREIGN KEY ("A") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTweet" ADD CONSTRAINT "_TagToTweet_B_fkey" FOREIGN KEY ("B") REFERENCES "tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
