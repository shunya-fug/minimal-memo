"use client";

import { TagsInput } from "@/components/TagsInput";
import { MemoOptionalDefaultsWithOptionalTagListSchema } from "@/schema/memo";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { mutate } from "swr";

/**
 * メモ作成フォーム
 */
export const MemoCreateForm = () => {
  const methods = useForm({
    resolver: zodResolver(MemoOptionalDefaultsWithOptionalTagListSchema),
    defaultValues: { content: "", tagList: [] },
  });

  /**
   * メモ作成
   */
  const createMemo = methods.handleSubmit(
    async (data) => {
      await fetch("/api/memos", {
        method: "POST",
        body: JSON.stringify(data),
      });
      methods.reset();
      mutate("/api/memos");
    },
    (e) => console.error(e)
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={createMemo}>
        {/* メモ入力 */}
        <textarea
          className="textarea textarea-bordered w-full h-32 rounded-md"
          placeholder="Memo"
          {...methods.register("content")}
        />
        {/* メモ入力エラー表示 */}
        {methods.formState.errors.content?.message && (
          <span className="text-error">
            <span className="label-text-alt text-error">{methods.formState.errors.content.message.toString()}</span>
          </span>
        )}
        {/* タグ入力 */}
        <TagsInput />
        {/* 登録ボタン */}
        <div className="text-right">
          <button type="submit" className="btn btn-sm rounded-md">
            Submit
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
