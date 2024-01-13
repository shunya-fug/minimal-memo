import { auth } from "@/common/auth";
import { MemoCreateInputSchema } from "@/generated/zod/inputTypeSchemas";
import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";

/**
 * Tweet一覧取得
 */
export const GET = auth(async (request) => {
  // データ取得
  const prisma = new PrismaClient();
  const memoList = await prisma.memo.findMany({
    // where 句に undefined を渡すと全件取得になるため念のため `|| ""` を付けておく
    where: { sub: request.auth?.user?.id || "" },
    include: { tagList: true },
    orderBy: { createdAt: "desc" },
  });
  return Response.json(memoList);
});

/**
 * Tweet登録
 */
export const POST = auth(async (request) => {
  // セッションからユーザー情報を取得して設定
  const { tagList: tagListInput, ...memoInput } = await request.json();
  memoInput.sub = request.auth?.user?.id;
  for (const tag of tagListInput) {
    tag.sub = request.auth?.user?.id;
  }

  // バリデーション
  const memoCreateInput: z.infer<typeof MemoCreateInputSchema> = {
    ...memoInput,
    tagList: {
      connectOrCreate: tagListInput.map((tag: Prisma.TagCreateWithoutMemoListInput) => ({
        where: { sub_value: { sub: request.auth?.user?.id, value: tag.value } },
        create: tag,
      })),
    },
  };
  const memoValidated = MemoCreateInputSchema.parse(memoCreateInput);

  // 登録
  const prisma = new PrismaClient();
  const memoCreated = await prisma.memo.create({ data: memoValidated });
  return Response.json(memoCreated);
});
