"use client";

import { Tag as TagComponent } from "@/components/Tag";
import { TagsInput } from "@/components/TagsInput";
import { MemoOptionalDefaultsSchema, TagOptionalDefaultsSchema } from "@/generated/zod/modelSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Memo, Tag } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const MemoOptionalDefaultsWithOptionalTagListSchema = MemoOptionalDefaultsSchema.extend({
  tagList: TagOptionalDefaultsSchema.array().optional(),
});
export type MemoOptionalDefaultsWithOptionalTagList = z.infer<typeof MemoOptionalDefaultsWithOptionalTagListSchema>;

export default function Home() {
  type MemoWithTagList = Memo & {
    tagList: Tag[];
  };
  const { data: memoList, isLoading, error, mutate } = useSWR<MemoWithTagList[]>("/api/memos", fetcher);
  const methods = useForm({ resolver: zodResolver(MemoOptionalDefaultsWithOptionalTagListSchema) });

  const getRandomLoadingClass = () => {
    const loadingClassList = [
      "loading-spinner",
      "loading-dots",
      "loading-ring",
      "loading-ball",
      "loading-bars",
      "loading-infinity",
    ];
    return loadingClassList[Math.floor(Math.random() * loadingClassList.length)];
  };

  const createMemo = methods.handleSubmit(
    async (data) => {
      const res = await fetch("/api/memos", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const memoCreated = await res.json();
      mutate();
    },
    (e) => console.error(e)
  );

  return (
    <main className="container mx-auto">
      <article className="prose">
        <h1>Minimal Memo</h1>
        <FormProvider {...methods}>
          <form onSubmit={createMemo}>
            <textarea
              className="textarea textarea-bordered w-full h-32 rounded-md"
              placeholder="Memo"
              {...methods.register("content")}
            />
            {methods.formState.errors.content && (
              <span className="text-error">
                <span className="label-text-alt text-error">
                  {methods.formState.errors.content.message?.toString()}
                </span>
              </span>
            )}
            <TagsInput />
            <div className="text-right">
              <button type="submit" className="btn btn-sm rounded-md">
                Submit
              </button>
            </div>
          </form>
        </FormProvider>
        <section>
          {isLoading ? (
            // 読み込み中はランダムにローディングアイコンを表示
            <div className="text-center my-10">
              <span className={`loading ${getRandomLoadingClass()}`}></span>
            </div>
          ) : error ? (
            // データ読み込みエラー
            <div className="text-center my-10">
              <span className="text-error">Data fetch error.</span>
            </div>
          ) : (
            // データ表示
            memoList?.map((memo) => (
              <div className="card card-compact my-3 mx-6 p-3 bg-primary-content rounded-sm" key={`card-${memo.id}`}>
                <div className="card-body">
                  <span>{memo.createdAt.toString()}</span>
                  <p>{memo.content}</p>
                  {memo.tagList.length > 0 && (
                    <>
                      <div className="divider my-0"></div>
                      <div className="flex gap-1">
                        {memo.tagList.map((tag) => (
                          <TagComponent key={`tag-${memo.id}-${tag.id}`} tag={tag} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </section>
      </article>
    </main>
  );
}
