import { MemoOptionalDefaultsWithOptionalTagListSchema } from "@/schema/memo";
import { z } from "zod";

export type MemoOptionalDefaultsWithOptionalTagList = z.infer<typeof MemoOptionalDefaultsWithOptionalTagListSchema>;
