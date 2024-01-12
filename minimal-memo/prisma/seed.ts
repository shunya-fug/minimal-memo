import { Prisma, PrismaClient, TagType } from "@prisma/client";

const prisma = new PrismaClient();

const memoList: Prisma.MemoCreateInput[] = [
  {
    sub: "sub1",
    content: "test1",
    tagList: {
      create: [{ sub: "sub1", value: "tag1", type: TagType.NORMAL }],
    },
  },
  {
    sub: "sub2",
    content: "test2",
    tagList: {
      create: [{ sub: "sub2", value: "/folder2", type: TagType.FOLDER }],
    },
  },
  {
    sub: "sub3",
    content: "test3",
    tagList: {
      create: [
        { sub: "sub3", value: "tag3/subtag3", type: TagType.NORMAL },
        { sub: "sub3", value: "/folder3/subfolder3", type: TagType.FOLDER },
      ],
    },
  },
];

const tagList: Prisma.TagCreateInput[] = [
  {
    sub: "sub",
    value: "tag/subtag",
    type: TagType.NORMAL,
  },
  {
    sub: "sub",
    value: "/folder/subfolder",
    type: TagType.FOLDER,
  },
];

async function main() {
  await prisma.memo.deleteMany();
  await prisma.tag.deleteMany();
  for (const memo of memoList) {
    await prisma.memo.create({ data: memo });
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
