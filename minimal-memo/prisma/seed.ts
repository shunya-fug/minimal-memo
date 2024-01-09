import { Prisma, PrismaClient, TagType } from "@prisma/client";

const prisma = new PrismaClient();

const tweetList: Prisma.MemoCreateInput[] = [
  {
    sub: "sub1",
    content: "test1",
    tagList: {
      create: [{ sub: "sub1", value: "#tag1", type: TagType.NORMAL }],
    },
  },
  {
    sub: "sub2",
    content: "test2",
    tagList: {
      create: [{ sub: "sub2", value: "##folder2", type: TagType.FOLDER }],
    },
  },
  {
    sub: "sub3",
    content: "test3",
    tagList: {
      create: [
        { sub: "sub3", value: "#tag3/subtag3", type: TagType.NORMAL },
        { sub: "sub3", value: "##folder3/subfolder3", type: TagType.FOLDER },
      ],
    },
  },
];

const tagList: Prisma.TagCreateInput[] = [
  {
    sub: "sub",
    value: "#folder",
    type: TagType.NORMAL,
  },
  {
    sub: "sub",
    value: "##folder/subfolder",
    type: TagType.FOLDER,
  },
];

async function main() {
  await prisma.memo.deleteMany();
  await prisma.tag.deleteMany();
  for (const tweet of tweetList) {
    await prisma.memo.create({ data: tweet });
  }
  await prisma.tag.createMany({ data: tagList });
}

await main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
