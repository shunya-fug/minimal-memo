"use client";

import { Memo as MemoComponent } from "@/components/Memo";
import { MemoCreateForm } from "@/components/MemoCreateForm";
import { MemoWithTagList } from "@/types/memo";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data: memoList, isLoading, error } = useSWR<MemoWithTagList[]>("/api/memos", fetcher);

  const Content = () => {
    // 読み込み中
    if (isLoading) {
      return (
        <div className="text-center my-10">
          <span className="loading loading-dots"></span>
        </div>
      );
    }
    // データ読み込みエラー
    if (error) {
      return (
        <div className="text-center my-10">
          <span className="text-error">Data fetch error.</span>
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
      <article className="prose">
        <h1>Minimal Memo</h1>
        <MemoCreateForm />
        <section>
          <Content />
        </section>
      </article>
    </main>
  );
}
