import { MemoOptionalDefaultsSchema, TagOptionalDefaultsSchema } from "@/generated/zod";

export const MemoOptionalDefaultsWithOptionalTagListSchema = MemoOptionalDefaultsSchema.extend({
  tagList: TagOptionalDefaultsSchema.array().optional(),
});
