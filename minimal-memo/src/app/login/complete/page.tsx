import { auth } from "@/util/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="container mx-auto">
      <article className="prose">
        <p>ログイン完了</p>
        <p>{session?.user?.email}</p>
      </article>
    </main>
  );
}
