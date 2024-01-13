"use client";

import { fetcher } from "@/common/fetcher";
import { Memo as MemoComponent } from "@/components/Memo";
import { MemoCreateForm } from "@/components/MemoCreateForm";
import { MemoWithTagList } from "@/types/memo";
import { ApiError } from "next/dist/server/api-utils";
import { StatusCode } from "status-code-enum";
import useSWR from "swr";

export default function Home() {
  const { data: memoList, isLoading, error } = useSWR<MemoWithTagList[], ApiError>("/api/memos", fetcher);

  const Content = () => {
    // 読み込み中
    if (isLoading) {
      return (
        <div className="text-center my-10">
          <span className="loading loading-dots"></span>
        </div>
      );
    }
    // APIエラー
    if (error) {
      // 認証エラーは無視
      if (error.statusCode === StatusCode.ClientErrorUnauthorized) {
        return;
      }
      // エラー表示
      return (
        <div className="text-center my-10">
          <span className="text-error">{error.message}</span>
        </div>
      );
    }
    // データ表示
    return (
      <>
        {memoList?.map((memo) => (
          <MemoComponent key={`memo-${memo.id}`} memo={memo} />
        ))}
      </>
    );
  };

  return (
    <main className="container mx-auto">
      <article className="prose mx-auto">
        <MemoCreateForm />
        <section>
          <Content />
        </section>
      </article>
    </main>
  );
}
