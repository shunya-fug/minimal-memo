import { MemoOptionalDefaultsWithOptionalTagListSchema } from "@/schema/memo";
import { Memo, Tag } from "@prisma/client";
import { z } from "zod";

export type MemoOptionalDefaultsWithOptionalTagList = z.infer<typeof MemoOptionalDefaultsWithOptionalTagListSchema>;

export type MemoWithTagList = Memo & {
  tagList: Tag[];
};
