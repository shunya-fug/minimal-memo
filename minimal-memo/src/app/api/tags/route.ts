import { auth } from "@/common/auth";
import { prisma } from "@/common/client";
import { Prisma } from "@prisma/client";

const getTagsResponse = {
  select: {
    id: true,
    value: true,
    type: true,
    createdAt: true,
    updatedAt: true,
    _count: {
      select: { memoList: true },
    },
  },
};
export type GetTagsResponse = Prisma.TagGetPayload<typeof getTagsResponse>;

/**
 * Tag一覧取得
 */
export const GET = auth(async (request) => {
  // データ取得
  const tagList = await prisma.tag.findMany({
    ...getTagsResponse,
    where: { sub: request.auth?.user?.id || "" },
    orderBy: { value: Prisma.SortOrder.asc },
  });
  return Response.json(tagList);
});
